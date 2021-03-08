<?php

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Supplier;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;

class SupplierUserSubscriber implements EventSubscriberInterface
{
  protected $security;

  public function __construct(Security $security)
  {
    $this->security = $security;
  }

  public static function getSubscribedEvents()
  {
    return [KernelEvents::VIEW => ['setUserForSupplier', EventPriorities::PRE_VALIDATE]];
  }

  public function setUserForSupplier(ViewEvent $event)
  {
    $supplier = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($supplier instanceof Supplier && $method === "POST") {
      $supplier->setUser($this->security->getUser());
    }
  }
}
