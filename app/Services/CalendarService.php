<?php

namespace App\Services;
use App\Repository\CalendarRepository;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;
use Carbon\Carbon;

class CalendarService {

    protected $calendarRepository;

    public function __construct(CalendarRepository $calendarRepository) 
    {
        $this->calendarRepository = $calendarRepository;
    }

    public function getData($data) {

        $validator = Validator::make($data, [
            'date_from' => 'required|date',
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first()); 
         }

         $dt = Carbon::create($data['date_from']);
         
         $result = $this->calendarRepository->get($dt->year, $dt->month);

         return $result;
    }

    public function savePostData($data) 
    {
        $validator = Validator::make($data, [
            'event_name' => 'required|max:255',
            'date_from' => 'required|date',
            'date_to' => 'required|date',
            'days' => 'required'
        ]);

        if ($validator->fails()) {
           throw new InvalidArgumentException($validator->errors()->first()); 
        }

        $dt = Carbon::create($data['date_from']);
        $data['year'] = $dt->year;
        $data['month'] = $dt->month;

        $result  =  $this->calendarRepository->save($data);

        return $result;
    }
}