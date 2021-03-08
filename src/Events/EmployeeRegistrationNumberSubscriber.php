<?php

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Employee;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class EmployeeRegistrationNumberSubscriber implements EventSubscriberInterface
{
  public static function getSubscribedEvents()
  {
    return
      [KernelEvents::VIEW => ['setRegistrationNumber', EventPriorities::PRE_WRITE]];
  }

  public function setRegistrationNumber(ViewEvent $event)
  {
    $employee = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($employee instanceof Employee && $method === "POST") {
      $employee->setRegistrationNumber(strtoupper(substr(str_replace(' ', '', $employee->getFirstname()), 0, 2)) . strtoupper(substr(str_replace(' ', '', $employee->getLastname()), 0, 2)) . str_replace(' ', '', $employee->getTelephone()));
    }
  }
}
