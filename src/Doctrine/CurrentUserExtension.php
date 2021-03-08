<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Category;
use App\Entity\Customer;
use App\Entity\Employee;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\Supplier;
use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
  protected $security;
  protected $auth;

  public function __construct(Security $security, AuthorizationCheckerInterface $checher)
  {
    $this->security = $security;
    $this->auth = $checher;
  }

  private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
  {
    $user = $this->security->getUser();

    if (
      ($resourceClass === Category::class
        ||
        $resourceClass === Customer::class
        ||
        $resourceClass === Order::class
        ||
        $resourceClass === Employee::class
        ||
        $resourceClass === Product::class
        ||
        $resourceClass === Supplier::class)
      &&
      !$this->auth->isGranted('ROLE_SUPER_ADMIN')
      &&
      $user instanceof User
    ) {
      $rootAlias = $queryBuilder->getRootAliases()[0];

      if (
        $resourceClass === Category::class
        ||
        $resourceClass === Customer::class
        ||
        $resourceClass === Employee::class
        ||
        $resourceClass === Supplier::class
      ) {
        $queryBuilder->andWhere("$rootAlias.user = :user");
      } elseif ($resourceClass === Order::class) {
        $queryBuilder->join("$rootAlias.customer", "c")
          ->andWhere("c.user = :user");
      } elseif ($resourceClass === Product::class) {
        $queryBuilder->join("$rootAlias.supplier", "s")
          ->andWhere("s.user = :user");
      }
      $queryBuilder->setParameter("user", $user);
    }
  }

  public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
  {
    $this->addWhere($queryBuilder, $resourceClass);
  }

  public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
  {
    $this->addWhere($queryBuilder, $resourceClass);
  }
}
