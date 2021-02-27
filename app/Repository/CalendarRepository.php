<?php

namespace App\Repository;
use App\Models\Calendar;

class CalendarRepository {
    
    protected $calendar;

    public function __construct(Calendar $calendar) 
    {
        $this->calendar = $calendar;
    }

    public function save($data) {
        $calendar =  $this->calendar->updateOrCreate( ['year' => $data['year'], 'month' => $data['month']], $data);
        return $calendar;
    }

    public function get($year, $month) {
        return $this->calendar->where('year', $year)
        ->where('month', $month)->first();
    }

}