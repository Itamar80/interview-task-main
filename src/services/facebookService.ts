import got, { Method } from 'got';
import { buildRequestBody, handleResponseStream, parseJSONStream } from '../utils.ts';

const FB_GRAPHQL_URL = 'https://www.facebook.com/api/graphql';

const defaultHeaders = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'cookie': 'datr=hcLvZPsAl9bKmHIA_cSJYiVk; wd=1555x1395',
    'dnt': '1',
    'dpr': '1',
    'origin': 'https://www.facebook.com',
    'pragma': 'no-cache',
    'referer': 'https://www.facebook.com/photo/?fbid=1692213461282212&set=ecnf.100014807225880',
    'sec-ch-prefers-color-scheme': 'light',
    'sec-ch-ua': '"Not)A;Brand";v="24", "Chromium";v="116"',
    'sec-ch-ua-full-version-list': '"Not)A;Brand";v="24.0.0.0", "Chromium";v="116.0.5845.110"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '',
    'sec-ch-ua-platform': 'macOS',
    'sec-ch-ua-platform-version': '13.5.0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'viewport-width': '1555',
    'x-asbd-id': '129477',
    'x-fb-friendly-name': 'ProfileCometHeaderQuery',
    'x-fb-lsd': 'AVot1N6vgY8'
};

const retryConfig = {
    limit: 3,
    methods: ['POST'] as Method[],
    statusCodes: [
        408,
        413,
        429,
        500,
        502,
        503,
        504,
        521,
        522,
        524
    ], errorCodes: [
        'ETIMEDOUT',
        'ECONNRESET',
        'EADDRINUSE',
        'ECONNREFUSED',
        'EPIPE',
        'ENOTFOUND',
        'ENETUNREACH',
        'EAI_AGAIN'
    ],
};

export async function replicateFacebookRequest(profileId: string): Promise<any> {
    const formattedBody = buildRequestBody(profileId);

    try {
        const responseStream = got.stream.post(FB_GRAPHQL_URL, {
            headers: defaultHeaders,
            body: formattedBody,
            retry: retryConfig,
        });

        const responseData = await handleResponseStream(responseStream);

        return parseJSONStream(responseData);
    } catch (error) {
        throw error;
    }
}
