import queryString from 'querystring';
import { Readable } from 'stream';
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 5,
  legacyHeaders: false,
});

export const PROFILE_ID_REGEX = /^\d+$/;

export function buildRequestBody(profileId: string): string {

  const variables = {
    "scale": 1,
    "selectedID": profileId,
    "selectedSpaceType": "community",
    "selectedTab": profileId,
    "shouldUseFXIMProfilePicEditor": false,
    "userID": profileId
  };

  const body = {
    'av': '0',
    '__user': '0',
    '__a': '1',
    '__req': 'g',
    '__hs': '19599.HYP%3Acomet_loggedout_pkg.2.1..0.0',
    'dpr': '1',
    '__ccg': 'GOOD',
    '__rev': '1008351450',
    '__s': 'k9lul1%3Af1yras%3A6tfwpp',
    '__hsi': '7273246140377822998',
    '__dyn': '7xeUmwlEnwn8K2WnFw9-2i5U4e1ZyUW3q32360CEbo2fw9m3y4o0B-q1ew65xO2O1Vw8G11xmfz83WwgEcEhwGwQw9m1YwBgao6C0Mo2sx-3m1mzXw8W58jwGzE2swwwJK2W5olw8Xxm16waCm7-8w4ywJwSyES0QEcU2ZwhEkxe3u362-2B0oo5C1hxG1FwhE7W',
    '__csr': 'gD2clljYZildbcD9TePqLnCLFbF9nF5JrlaiZKp5EyhAVKLjnKibQATK9GbKrCFefxu9hETAhGyEmQGUx2kqcK494bmuFf-i4UW9KiunKEGV9Kiicgy5-bQXHxGaCze8yGJ17HLHzpGK4Vu8xjBxOfw4BCw3MoS12w4bgtw4gwhz0AwzHQiiiU32w8u04n8Dw3so2fo0gRw2z80zO0oi1hxkM0r_w2ZE05ijw0zmw0I-g3nVN82Vg1c81nofo2Ba0ha1jxaehll2Evz40V831gK1Dzoeoco3vo2Vx3g2fg3jwik0Jo5pp6m8wfC4o420Eo1gpBc1hw8S5o1bS0xFQ091wsCmTz4dIOwHhvo1DU19Q1Qw922ZwuE3PggwBg1q-2y19wcS1zwfK2O0pC8yE27wEgmwzwn83mwr9o6O0Yo4rAoK1BwgHw1ltw-w2K80j2ppU17E590vQ0aTDgGhw8m0G86twfm0yoa8f8cS1uwNQ0DE2sxK0ne1wJ07fw6lw5ww56wt82nhU13o1Zo6gg9w8Y9yx2wjk1ggytgy0hR6Dw9y2u0Io',
    '__comet_req': '15',
    'lsd': 'AVot1N6vgY8',
    'jazoest': '2925',
    '__spin_r': '1008351450',
    '__spin_b': 'trunk',
    '__spin_t': '1693434580',
    'qpl_active_flow_ids': '931594241',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'ProfileCometHeaderQuery',
    'server_timestamps': 'true',
    'doc_id': '9929832307087807',
    'variables': JSON.stringify(variables)
  };

  return queryString.stringify(body);
}

export async function handleResponseStream(stream: Readable): Promise<string> {
  let responseData = '';
  for await (const chunk of stream) {
    responseData += chunk;
  }
  return responseData;
}

export function parseJSONStream(responseData: string): any[] {
  const responseLines = responseData.split('\n').filter(line => line.trim());
  return responseLines.map(line => JSON.parse(line))[0];
}
