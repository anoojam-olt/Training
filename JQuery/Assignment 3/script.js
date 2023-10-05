$(document).ready(function () {
    var dataTable = $('table').DataTable({
        columns:  [
            { data: 'Country' },
            { data: 'Mfr_CommonName' },
            { data: 'Mfr_ID' },
            { data: 'Mfr_Name' },
            { data: 'VehicleTypes', render: function(data) {
                    return data.map(function(type) {
                        return type.Name;
                    }).join(', ');
                }
            }
        ]
    });

    $('#searchButton').on('click', function () {
        var searchId = $('#searchId').val().toLowerCase();
        if (searchId === '') 
        return;
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

                dataTable.rows.add(filteredData).draw();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
});
