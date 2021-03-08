<?php

namespace App\Events;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Order;
use App\Repository\OrderRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;

class OrderChronoSubscriber implements EventSubscriberInterface
{
  protected $security;
  protected $orderRepository;

  public function __construct(Security $security, OrderRepository $orderRepository)
  {
    $this->security = $security;
    $this->orderRepository = $orderRepository;
  }
  public static function getSubscribedEvents()
  {
    return [
      KernelEvents::VIEW => ['setOrderChrono', EventPriorities::PRE_VALIDATE]
    ];
  }

  public function setOrderChrono(ViewEvent $event)
  {
    $order = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($order instanceof Order && $method === "POST") {
      $order->setChrono($this->orderRepository->findNextChrono($this->security->getUser()));

      if (empty($order->getCreatedAt())) {
        $order->setCreatedAt(new \DateTime());
      }
    }
  }
}
