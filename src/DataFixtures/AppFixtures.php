<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Customer;
use App\Entity\Employee;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\Supplier;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    protected $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create("fr_FR");

        $suppliers = [];
        $customers = [];

        $user = new User();
        $user->setEmail("admin@admin.com")
            ->setFirstname("Bruno")
            ->setLastname("Dogbase")
            ->setPassword($this->encoder->encodePassword($user, "password"))
            ->setRoles(['ROLE_USER'])
            ->setCreatedAt(new DateTime());

        $manager->persist($user);

        for ($u = 0; $u < 2; $u++) {
            $user = new User();
            $user->setEmail($faker->email)
                ->setFirstname($faker->firstName)
                ->setLastname($faker->lastName)
                ->setPassword($this->encoder->encodePassword($user, "password"))
                ->setCreatedAt(new \DateTime());

            $manager->persist($user);

            for ($s = 0; $s < rand(1, 3); $s++) {
                $supplier = new Supplier();

                $supplier->setEmail($faker->email)
                    ->setFirstname($faker->firstName)
                    ->setLastname($faker->lastName)
                    ->setTelephone($faker->phoneNumber)
                    ->setUser($user)
                    ->setAddress($faker->address)
                    ->setCompany($faker->company)
                    ->setCreatedAt(new \DateTime());

                $suppliers[] = $supplier;

                $manager->persist($supplier);
            }

            for ($c = 0; $c < rand(1, 6); $c++) {
                $customer = new Customer();
                $customer->setEmail($faker->email)
                    ->setFirstname($faker->firstName)
                    ->setLastname($faker->lastName)
                    ->setSex($faker->randomElement(["M", "F"]))
                    ->setTelephone($faker->phoneNumber)
                    ->setUser($user)
                    ->setAddress($faker->address)
                    ->setCode(substr($customer->getFirstname(), 0, 2) . substr($customer->getLastname(), 0, 2) . $customer->getTelephone())
                    ->setCompany($faker->randomElement([null, $faker->company]))
                    ->setCreatedAt(new \DateTime());

                $customers[] = $customer;

                $manager->persist($customer);
            }

            for ($c = 0; $c < $faker->numberBetween(2, 5); $c++) {
                $category = new Category();
                $category->setName($faker->title)
                    ->setUser($user)
                    ->setCreatedAt(new \DateTime());

                $manager->persist($category);

                for ($p = 0; $p < $faker->numberBetween(1, 10); $p++) {
                    $product = new Product();
                    $product->setName($faker->randomElement([$faker->linuxProcessor, $faker->macProcessor]))
                        ->setQuantity($faker->numberBetween(10, 200))
                        ->setPrice($faker->randomNumber(5))
                        ->setSupplier($faker->randomElement($suppliers))
                        ->setCreatedAt(new \DateTime());

                    $manager->persist($product);

                    for ($o = 0; $o < rand(0, 3); $o++) {
                        $order = new Order();

                        $order->setCreatedAt(new \DateTime())
                            ->setCustomer($faker->randomElement($customers))
                            ->setProduct($product)
                            ->setQuantity(rand(1, 5))
                            ->setStatus($faker->randomElement(["PAID", "CANCELLED", "SENT"]));

                        $manager->persist($order);
                    }
                }
            }

            for ($e = 0; $e < rand(2, 10); $e++) {
                $employee = new Employee();

                $employee->setCreatedAt(new \DateTime())
                    ->setEmail($faker->email)
                    ->setFirstname($faker->firstName)
                    ->setJob($faker->jobTitle)
                    ->setLastname($faker->lastName)
                    ->setTelephone($faker->phoneNumber)
                    ->setRegistrationNumber(substr($employee->getFirstname(), 0, 2) . substr($employee->getLastname(), 0, 2) . $employee->getTelephone())
                    ->setUser($user)
                    ->setAddress($faker->address);

                $manager->persist($employee);
            }
        }

        $manager->flush();
    }
}
