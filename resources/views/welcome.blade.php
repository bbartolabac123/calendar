<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Calendar</title>
        <!-- Fonts -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Styles -->
    </head>
    <body className="container">
         <!-- React root DOM -->
        <div id="example">
        </div>

        <!-- React JS -->
        <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
</html>
