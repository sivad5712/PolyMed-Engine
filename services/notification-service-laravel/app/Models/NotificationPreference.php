<?php

namespace App\Models;

class NotificationPreference
{
    public $patientId;
    public $receiveEmail;
    public $receiveSMS;
    public $receivePortalAlerts;
    public $preferredChannels;
    public $quietHoursStart;
    public $quietHoursEnd;
}
