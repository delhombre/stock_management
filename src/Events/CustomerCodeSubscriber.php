<?php

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class CustomerCodeSubscriber implements EventSubscriberInterface
{
  public static function getSubscribedEvents()
  {
    return [
      KernelEvents::VIEW => ['setCode', EventPriorities::PRE_WRITE]
    ];
  }

  public function setCode(ViewEvent $event)
  {
    $customer = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($customer instanceof Customer && $method === "POST") {
      $customer->setCode(substr(strtoupper(str_replace(' ', '', $customer->getFirstname())), 0, 2) . substr(strtoupper(str_replace(' ', '', $customer->getLastname())), 0, 2) . str_replace(' ', '', $customer->getTelephone()));
    }
  }
}
