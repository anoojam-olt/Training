// Define the render function
function renderVehicleTypes(data) {
    return data.map(function (type) {
        return type.Name;
    }).join(', ');
}

var dataTable = $('table').DataTable({
    columns: [
        { data: 'Country' },
        { data: 'Mfr_CommonName' },
        { data: 'Mfr_ID' },
        { data: 'Mfr_Name' },
        { data: 'VehicleTypes', render: renderVehicleTypes }
    ]
});
var lastSearch = ''; // Store the last search query

$('#searchButton').on('click', function () {
    var searchId = $('#searchId').val().toLowerCase();
    if (searchId === '')
        return;

    // Check if the search input is the same as the last search
    if (searchId === lastSearch) {
        return;
    }

    // Clear the current table rows
    dataTable.clear().draw();

    $.ajax({
        url: "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var filteredData = data.Results.filter(function (item) {
                var values = Object.values(item).join(' ').toLowerCase();
                return values.includes(searchId);
            });

            // Add the filtered data to the DataTable
            dataTable.rows.add(filteredData).draw();

            // Update the last search query
            lastSearch = searchId;
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
});
