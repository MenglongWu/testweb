// device-info-core.js

/**
 * 采集设备信息并返回 Promise
 * @returns {Promise<Object>} 包含基本信息、IP 和地理位置
 */
export async function collectDeviceInfo() {
    const info = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceType: /Mobile|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        url: window.location.href,
        referrer: document.referrer || 'direct'
    };


    // try {
    //     const ipResponse = await fetch('https://api.ipify.org?format=json');
    //     const ipData = await ipResponse.json();
    //     info.ipAddress = ipData.ip;

    //     try {
    //         const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
    //         const geoData = await geoResponse.json();
    //         info.country = geoData.country_name;
    //         info.region = geoData.region;
    //         info.city = geoData.city;
    //     } catch (geoError) {
    //         info.country = '未知';
    //         info.geoError = geoError.message;
    //     }
    // } catch (ipError) {
    //     info.ipAddress = '未知';
    //     info.ipError = ipError.message;
    // }

    return info;
}

/**
 * 将数据以 GET 请求形式发送到指定本地服务器
 * @param {Object} data - 要发送的数据
 * @param {string} endpoint - 目标地址（如 http://127.0.0.1:5001/log）
 * @returns {Promise<Response>}
 */
export async function sendToLocalServer(data, endpoint) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
        queryParams.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }

    const url = endpoint.includes('?') ? `${endpoint}${queryParams}` : `${endpoint}?${queryParams}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        mode: 'cors'
    });

    if (!response.ok) {
        throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }

    return response;
}
