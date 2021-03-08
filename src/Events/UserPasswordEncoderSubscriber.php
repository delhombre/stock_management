<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserPasswordEncoderSubscriber implements EventSubscriberInterface
{
  protected $encoder;

  public function __construct(UserPasswordEncoderInterface $encoder)
  {
    $this->encoder = $encoder;
  }
  public static function getSubscribedEvents()
  {
    return [
      KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
    ];
  }

  public function encodePassword(ViewEvent $event)
  {
    $user = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($user instanceof User && ($method === "POST" || $method === "PUT")) {
      $user->setPassword($this->encoder->encodePassword($user, $user->getPassword()));
    }
  }
}
