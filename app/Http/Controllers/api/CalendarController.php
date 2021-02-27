<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\CalendarService;
use Illuminate\Http\Request;

class CalendarController extends Controller
{

    protected $calendarService;

    public function __construct(CalendarService $calendarService) 
    {
        $this->calendarService = $calendarService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $data = $request->only([
            'date_from'
        ]);

        $result = ['status' => 200];

        try {
            $result['data'] = $this->calendarService->getData($data);
        } catch(Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($result, $result['status']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = $request->only([
            'event_name',
            'date_from',
            'date_to',
            'days'
        ]);

        $result = ['status' => 200];

        try {
            $result['data'] = $this->calendarService->savePostData($data);
        } catch(Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }


        return response()->json($result, $result['status']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
