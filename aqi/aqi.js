$(document).ready(function () {
    const JSON_PATH = "AQI.json"; // 本地 JSON 檔案名稱

    // 從本地 JSON 檔案讀取數據
    fetch(JSON_PATH)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data)) {
                populateTable(data); // 初始填充表格
                setupLiveFilter(data); // 設置即時篩選功能
            } else {
                alert("數據加載失敗，請檢查 JSON 檔案內容！");
            }
        })
        .catch(error => {
            console.error("無法加載本地 JSON 檔案:", error);
            alert("讀取 JSON 檔案失敗，請檢查檔案路徑和內容！");
        });

    // 填充表格
    function populateTable(data) {
        const tbody = $("#aqi-table tbody");
        tbody.empty();

        data.forEach(item => {
            const row = `
          <tr>
            <td>${item.siteid}</td>
            <td>${item.sitename}</td>
            <td>${item.monitordate}</td>
            <td>${item.aqi}</td>
            <td>${item.so2subindex || 'N/A'}</td>
            <td>${item.cosubindex || 'N/A'}</td>
            <td>${item.o3subindex || 'N/A'}</td>
            <td>${item.pm10subindex || 'N/A'}</td>
            <td>${item.no2subindex || 'N/A'}</td>
            <td>${item.pm25subindex || 'N/A'}</td>
          </tr>`;
            tbody.append(row);
        });
    }

    // 設置即時篩選功能
    function setupLiveFilter(data) {
        $("#site-name").on("input", function () {
            const siteName = $(this).val().trim();

            // 篩選數據
            const filteredData = data.filter(item => item.sitename.includes(siteName));

            // 填充過濾後的表格
            populateTable(filteredData);
        });
    }
});
