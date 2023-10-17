$(document).ready(function () {
    var dataTable = $('#dataTable').DataTable({
        paging: false,
        info: false,
        searching: false,
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    console.log(row);
                    if (type === 'display') {
                        var siNo = (currentPage - 1) * 10 + meta.row + 1;
                        return siNo;
                    }
                    return data;
                },
            },
            { data: 'limit' }, // Add ID column
            { data: 'name' }, // Add Name column
            { data: 'gender' }, // Add Gender column
            { data: 'email' }, // Add Email column
            { data: 'university' },
            { data: 'bloodGroup' }, // Add Blood Group column
        ],
        
    });

    var prevPageBtn = $('#prevPageBtn');
    var nextPageBtn = $('#nextPageBtn');
    var searchResults = [];
    var currentPage = 1;
    var buttonsPerPage = 5;
    var searchForm = $('#searchForm');
    var searchInput = $('#searchInput');
    var entriesRange = $('#entriesRange');
    var currentPageElement = $('#currentPage');
    // var totalPagesElement = $('#totalPages');
    var pageButtonsContainer = $('#pageButtons');

    prevPageBtn.hide();
    nextPageBtn.hide();

    function updateTable(page) {
        dataTable.clear();

        if (searchResults.length > 0) {
            var startIndex = (page - 1) * 10;
            var endIndex = startIndex + 10;
            var pageData = searchResults.slice(startIndex, endIndex);

            dataTable.rows.add(pageData);
            dataTable.draw();
        } else {
            console.error('No search results to display');
        }
        updateEntriesRange(page);

        var totalPages = Math.ceil(searchResults.length / 10);
        if (totalPages <= 1) {
            prevPageBtn.hide();
            nextPageBtn.hide();
        } else {
            prevPageBtn.show();
            nextPageBtn.show();
        }
    }

    function updateEntriesRange(currentPage) {
        var totalPages = Math.ceil(searchResults.length / 10);
        var startIndex = (currentPage - 1) * 10 + 1;
        var endIndex = Math.min(currentPage * 10, searchResults.length);
        var entriesRangeText = `Showing ${startIndex} to ${endIndex} of ${searchResults.length} entries`;
        entriesRange.text(entriesRangeText);
    }

    searchForm.submit(function (e) {
        e.preventDefault();
        var searchValue = searchInput.val().trim();

        var apiUrl = 'https://dummyjson.com/users'; // Updated API URL

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                searchResults = data || [];
                currentPage = 1;
                updateTable(currentPage);
                currentPageElement.text(currentPage);
                // totalPagesElement.text(Math.ceil(searchResults.length / 10));
                updatePageButtons();
                updateEntriesRange(currentPage);
            },
            error: function (status, error) {
                console.error('API call failed:', status, error);
            }
        });
    });

    prevPageBtn.click(function () {
        if (currentPage > 1) {
            currentPage--;
            updateTable(currentPage);
            currentPageElement.text(currentPage);
            updatePageButtons();
        }
    });

    nextPageBtn.click(function () {
        var totalPages = Math.ceil(searchResults.length / 10);
        if (currentPage < totalPages) {
            currentPage++;
            updateTable(currentPage);
            currentPageElement.text(currentPage);
            updatePageButtons();
        }
    });

    function updatePageButtons() {
        var totalPages = Math.ceil(searchResults.length / 10);
        var pageButtonsHtml = '';

        if (totalPages <= buttonsPerPage) {
            for (var i = 1; i <= totalPages; i++) {
                pageButtonsHtml += createPageButton(i);
            }
        } else {
            var startPage = Math.max(1, currentPage - Math.floor(buttonsPerPage / 2));
            var endPage = Math.min(totalPages, startPage + buttonsPerPage - 1);

            if (startPage > 1) {
                pageButtonsHtml += createPageButton(1);
                if (startPage > 2) {
                    pageButtonsHtml += '<span class="ellipsis">...</span>';
                } else {
                    pageButtonsHtml += ' ';
                }
            }

            for (var i = startPage; i <= endPage; i++) {
                pageButtonsHtml += createPageButton(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageButtonsHtml += '<span class="ellipsis">...</span>';
                } else {
                    pageButtonsHtml += ' ';
                }
                pageButtonsHtml += createPageButton(totalPages);
            }
        }
        pageButtonsContainer.html(pageButtonsHtml);

        $('.page-button').click(function () {
            var page = parseInt($(this).data('page'));
            currentPage = page;
            updateTable(currentPage);
            currentPageElement.text(currentPage);
            updatePageButtons();
        });
    }

    function createPageButton(page) {
        return '<button class="page-button" data-page="' + page + '">' + page + '</button>';
    }
});