$(document).ready(function () {
    function tomorrow() {
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        return {
            year:year,
            month:month,
            day:day
        };
    }
    var tomorrow = tomorrow();
    var $startdate = $('#startdate-event').pickadate();
    var picker = $startdate.pickadate('picker');
    picker.set('select', [tomorrow.year, tomorrow.month, tomorrow.day]);

    $starttime = $('#starttime-event').val('06:00');

    $enddate = $('#enddate-event').pickadate();
    picker = $enddate.pickadate('picker');
    picker.set('select', [tomorrow.year, tomorrow.month, tomorrow.day]);

    $endtime = $('#endtime-event').val('07:00');
});
