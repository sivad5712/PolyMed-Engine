<?php

namespace App\Models;

class Notification
{
    public $notificationId;
    public $patientId;
    public $type;
    public $templateCode;
    public $recipient;
    public $subject;
    public $body;
    public $status;
    public $sentAt;
}
