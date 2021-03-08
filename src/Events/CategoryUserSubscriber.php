<?php

namespace App\Events;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Category;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CategoryUserSubscriber implements EventSubscriberInterface
{
  protected $security;

  public function __construct(Security $security)
  {
    $this->security = $security;
  }

  public static function getSubscribedEvents()
  {
    return [KernelEvents::VIEW => ['setUserForCategory', EventPriorities::PRE_VALIDATE]];
  }

  public function setUserForCategory(ViewEvent $event)
  {
    $category = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($category instanceof Category && $method === "POST") {
      $category->setUser($this->security->getUser());

      if (empty($category->getCreatedAt())) {
        $category->setCreatedAt(new \DateTime());
      }
    }
  }
}
