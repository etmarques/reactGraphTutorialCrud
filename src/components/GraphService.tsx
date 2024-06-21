// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <GetUserSnippet>
import { Client, GraphRequestOptions, PageCollection, PageIterator } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';


import { endOfWeek, startOfWeek } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { User, Event } from '@microsoft/microsoft-graph-types';

let graphClient: Client | undefined = undefined;

export function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!.api('/me')
    // Only retrieve the specific fields needed
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}
// </GetUserSnippet>

// <GetUserWeekCalendarSnippet>
export async function getUserWeekCalendar(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  timeZone: string): Promise<Event[]> {
  ensureClient(authProvider);

  // Generate startDateTime and endDateTime query params
  // to display a 7-day window
  const now = new Date();
  const startDateTime = toZonedTime(startOfWeek(now), timeZone).toISOString();
  const endDateTime = toZonedTime(endOfWeek(now), timeZone).toISOString();

  // GET /me/calendarview?startDateTime=''&endDateTime=''
  // &$select=subject,organizer,start,end
  // &$orderby=start/dateTime
  // &$top=50
  var response: PageCollection = await graphClient!
    .api('/me/calendarview')
    .header('Prefer', `outlook.timezone="${timeZone}"`)
    .query({ startDateTime: startDateTime, endDateTime: endDateTime })
    .select('subject,organizer,start,end')
    .orderby('start/dateTime')
    .top(25)
    .get();

  if (response["@odata.nextLink"]) {
    // Presence of the nextLink property indicates more results are available
    // Use a page iterator to get all results
    var events: Event[] = [];

    // Must include the time zone header in page
    // requests too
    var options: GraphRequestOptions = {
      headers: { 'Prefer': `outlook.timezone="${timeZone}"` }
    };

    var pageIterator = new PageIterator(graphClient!, response, (event) => {
      events.push(event);
      return true;
    }, options);

    await pageIterator.iterate();

    return events;
  } else {

    return response.value;
  }
}
// </GetUserWeekCalendarSnippet>

// <CreateEventSnippet>
export async function createEvent(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
  newEvent: Event): Promise<Event> {
  ensureClient(authProvider);

  // POST /me/events
  // JSON representation of the new event is sent in the
  // request body
  return await graphClient!
    .api('/me/events')
    .post(newEvent);
}
// </CreateEventSnippet>

// Função para obter uma lista do SharePoint
export async function getList(authProvider: AuthCodeMSALBrowserAuthenticationProvider, siteId: string, listId: string) {
  try {
    await ensureClient(authProvider)
    const list = await graphClient!.api(`/sites/${siteId}/lists/${listId}`).get();
    return list;
  } catch (error) {
    console.error('Erro ao obter a lista:', error);
    throw error;
  }
}