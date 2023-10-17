    let currentPage = 1;
    const rowsPerPage = 50;
    const dataTable = $('#dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: ['excelHtml5', 'csvHtml5', 'pdfHtml5'],
    });

    function updateSerialNumbers() {
        dataTable.rows().every(function serialNumber(rowIdx) {
            const data = this.data();
            data[0] = rowIdx + 1 + (currentPage - 1) * rowsPerPage;
            this.data(data);
            return 0;
        });
    }

    function fetchAndDisplayData() {
        const searchValueId = $('#searchInputId').val();
        const searchValueName = $('#searchInputName').val();

        let searchUrl = 'https://dummyjson.com/users';

        if (searchValueId) {
            searchUrl += `/${encodeURIComponent(searchValueId)}`;
          }
        
          else if (searchValueName) {
            searchUrl += `/search?q=${encodeURIComponent(searchValueName)}`;
          }

          else if(searchValueName ===''|| searchValueId === '') {
               searchUrl+= '?limit=100';    
            }

        if (!searchValueId && !searchValueName) {
            $('#customPagination').show();
        } else {
            $('#customPagination').hide();
        }
        
        let index = 1;

        $.ajax({
            url: searchUrl,
            type: 'GET',
            dataType: 'json',
            success(data) {
                dataTable.clear().draw();
                console.log(data);
                if (Array.isArray(data.users)) {
                    data.users.forEach((item) => {
                        dataTable.row.add([
                            index,
                            item.id,
                            item.firstName,
                            item.lastName,
                            item.age,
                            item.gender,
                            item.phone,
                            item.bloodGroup,
                            item.university,
                            item.email,
                        ]);
                        index += 1;
                    });
                } else if (data.id) {
                    dataTable.row.add([
                        index,
                        data.id,
                        data.firstName,
                        data.lastName,
                        data.age,
                        data.gender,
                        data.phone,
                        data.bloodGroup,
                        data.university,
                        data.email,
                    ]);
                }

                dataTable.draw();
                updateSerialNumbers();

                if (dataTable.page.info().pages <= 1) {
                    $('#customPagination').hide();
                } else {
                    $('#customPagination').show();
                }

                $('#searchInputId').val('');
                $('#searchInputName').val('');
                $('#terms').val('');
            },
            error(xhr) {
                console.error(xhr, 'Error fetching data.');
            },
        });
    }

    $('#searchForm').submit((e) => {
        e.preventDefault();
        fetchAndDisplayData();
    });
    

    
