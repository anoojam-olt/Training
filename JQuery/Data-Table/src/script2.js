$(document).ready(function () {
    var dataTable = $("table").DataTable(); // Initialize DataTable

    $("#submitButton").click(function (e) {
        e.preventDefault();
        var searchTerm = $("#searchInput").val();

        $.ajax({
            url: "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json",
            type: "GET",
            dataType: "json",
            success: function (data) {
                var filteredData = data.Results.filter(function (item) {
                    return (item.ManufacturerType.toLowerCase().includes(searchTerm.toLowerCase()));
                });

                // Clear previous data in DataTable and add new data
                dataTable.clear().rows.add(filteredData).draw();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
});
