---
id: d8v18
name: The flow of an API call
file_version: 1.1.0
app_version: 1.0.2
file_blobs:
  static/app/views/dataExport/dataDownload.tsx: 1d5a818c7040d31c720f1aa24093d1fdb84a4ae7
  static/app/routes.tsx: ea6f39f35818df39dae826d476d068f9e8b212d9
  src/sentry/api/urls.py: a0aa15624804393ce3b8a9463c224fa3019afe97
  src/sentry/data_export/endpoints/data_export_details.py: b22da8e3f1b06cbdaf440acf6fe4405acc98a515
  tests/js/spec/views/dataExport/dataDownload.spec.jsx: 58f81b48e8fb754f48f33ea19295282253ca5dea
  tests/sentry/data_export/endpoints/test_data_export_details.py: ec31127c2ab1d24cc3f8f625870a8d84e26e8d0f
---

We have API endpoints that are exposed to our users. Sometimes, we use them internally.

In this walkthrough we will follow the example of a button allowing the user to download sentry data as CSV:

<br/>

<div align="center"><img src="https://firebasestorage.googleapis.com/v0/b/swimmio-content/o/repositories%2FZ2l0aHViJTNBJTNBc2VudHJ5JTNBJTNBc3dpbW1pbw%3D%3D%2F8dfe0b92-7e7e-4338-b1ff-3738ac5503db.png?alt=media&token=a80f09a7-7c13-4dd5-903b-7c764e9b9a65" style="width:'100%'"/></div>

<br/>

Starting with the frontend, we can see that the `Button`<swm-token data-swm-token=":static/app/views/dataExport/dataDownload.tsx:197:2:2:`          &lt;Button`"/> calls the api endpoint `data-export`<swm-token data-swm-token=":static/app/views/dataExport/dataDownload.tsx:200:15:17:`            href={`/api/0/organizations/${orgId}/data-export/${dataExportId}/?download=true`}`"/>.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 static/app/views/dataExport/dataDownload.tsx
```tsx
⬜ 194            </Header>
⬜ 195            <Body>
⬜ 196              <p>{t("See, that wasn't so bad. Your data is all ready for download.")}</p>
🟩 197              <Button
🟩 198                priority="primary"
🟩 199                icon={<IconDownload />}
🟩 200                href={`/api/0/organizations/${orgId}/data-export/${dataExportId}/?download=true`}
🟩 201              >
🟩 202                {t('Download CSV')}
🟩 203              </Button>
⬜ 204              <p>
⬜ 205                {t("That link won't last forever — it expires:")}
⬜ 206                <br />
```

<br/>

The route to this view is defined in `📄 static/app/routes.tsx` :
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 static/app/routes.tsx
```tsx
⬜ 193            componentPromise={() => import('sentry/views/organizationCreate')}
⬜ 194            component={SafeLazyLoad}
⬜ 195          />
🟩 196          <Route
🟩 197            path="/organizations/:orgId/data-export/:dataExportId"
🟩 198            componentPromise={() => import('sentry/views/dataExport/dataDownload')}
🟩 199            component={SafeLazyLoad}
🟩 200          />
⬜ 201          <Route
⬜ 202            path="/organizations/:orgId/disabled-member/"
⬜ 203            componentPromise={() => import('sentry/views/disabledMember')}
```

<br/>

This API call should now be handled by an endpoint. For that, the `url`<swm-token data-swm-token=":src/sentry/api/urls.py:859:1:1:`                url(`"/> is registered here. The snippet below links the relevant `url`<swm-token data-swm-token=":src/sentry/api/urls.py:859:1:1:`                url(`"/> with the endpoint `DataExportDetailsEndpoint`<swm-token data-swm-token=":src/sentry/api/urls.py:861:1:1:`                    DataExportDetailsEndpoint.as_view(),`"/> :
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/sentry/api/urls.py
```python
⬜ 853                    # Data Export
⬜ 854                    url(
⬜ 855                        r"^(?P<organization_slug>[^\/]+)/data-export/$",
⬜ 856                        DataExportEndpoint.as_view(),
⬜ 857                        name="sentry-api-0-organization-data-export",
⬜ 858                    ),
🟩 859                    url(
🟩 860                        r"^(?P<organization_slug>[^\/]+)/data-export/(?P<data_export_id>[^\/]+)/$",
🟩 861                        DataExportDetailsEndpoint.as_view(),
🟩 862                        name="sentry-api-0-organization-data-export-details",
🟩 863                    ),
```

<br/>

This endpoint is defined here, and can handle `GET`<swm-token data-swm-token=":src/sentry/data_export/endpoints/data_export_details.py:42:5:5:`        if request.GET.get(&quot;download&quot;) is not None and data_export._get_file() is not None:`"/> requests - with the `get`<swm-token data-swm-token=":src/sentry/data_export/endpoints/data_export_details.py:20:3:3:`    def get(self, request: Request, organization: Organization, data_export_id: str) -&gt; Response:`"/> handler:
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/sentry/data_export/endpoints/data_export_details.py
```python
🟩 17     class DataExportDetailsEndpoint(OrganizationEndpoint):
🟩 18         permission_classes = (OrganizationDataExportPermission,)
🟩 19     
🟩 20         def get(self, request: Request, organization: Organization, data_export_id: str) -> Response:
```

<br/>

Recall that on the frontend we passed the parameter `download`<swm-token data-swm-token=":static/app/views/dataExport/dataDownload.tsx:200:23:23:`            href={`/api/0/organizations/${orgId}/data-export/${dataExportId}/?download=true`}`"/> :
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 static/app/views/dataExport/dataDownload.tsx
```tsx
⬜ 197              <Button
⬜ 198                priority="primary"
⬜ 199                icon={<IconDownload />}
🟩 200                href={`/api/0/organizations/${orgId}/data-export/${dataExportId}/?download=true`}
⬜ 201              >
⬜ 202                {t('Download CSV')}
⬜ 203              </Button>
```

<br/>

Here the endpoint parses this param and continues accordingly.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/sentry/data_export/endpoints/data_export_details.py
```python
⬜ 41             # Ignore the download parameter unless we have a file to stream
🟩 42             if request.GET.get("download") is not None and data_export._get_file() is not None:
🟩 43                 return self.download(data_export)
⬜ 44             return Response(serialize(data_export, request.user))
```

<br/>

# Testing

## Frontend

<br/>

Note that we use `MockApiClient.addMockResponse`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:15:1:3:`    MockApiClient.addMockResponse({`"/> to mock API calls. This function returns a jest mock that represents `request`<swm-token data-swm-token=":src/sentry/data_export/endpoints/data_export_details.py:20:8:8:`    def get(self, request: Request, organization: Organization, data_export_id: str) -&gt; Response:`"/> calls.<br/>
For our case, we need to add an `organization`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:9:3:3:`  const organization = TestStubs.Organization();`"/>, so we use `TestStubs.Organization`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:9:7:9:`  const organization = TestStubs.Organization();`"/> to generate a stub one.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 tests/js/spec/views/dataExport/dataDownload.spec.jsx
```javascript
⬜ 4      import DataDownload, {DownloadStatus} from 'sentry/views/dataExport/dataDownload';
⬜ 5      
⬜ 6      describe('DataDownload', function () {
🟩 7        beforeEach(MockApiClient.clearMockResponses);
🟩 8        const dateExpired = new Date();
🟩 9        const organization = TestStubs.Organization();
🟩 10       const mockRouteParams = {
🟩 11         orgId: organization.slug,
🟩 12         dataExportId: 721,
🟩 13       };
🟩 14       const getDataExportDetails = (body, statusCode = 200) =>
🟩 15         MockApiClient.addMockResponse({
🟩 16           url: `/organizations/${mockRouteParams.orgId}/data-export/${mockRouteParams.dataExportId}/`,
🟩 17           body,
🟩 18           statusCode,
🟩 19         });
```

<br/>

We can then test the the UI, like so.<br/>
Note that we use `mockRouteParams`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:69:15:15:`    const wrapper = mountWithTheme(&lt;DataDownload params={mockRouteParams} /&gt;);`"/> on `mountWithTheme`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:69:7:7:`    const wrapper = mountWithTheme(&lt;DataDownload params={mockRouteParams} /&gt;);`"/>, that is, the `mockRouteParams`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:10:3:3:`  const mockRouteParams = {`"/> that were initiated in the previous snippet. We use `mountWithTheme`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:69:7:7:`    const wrapper = mountWithTheme(&lt;DataDownload params={mockRouteParams} /&gt;);`"/> here so that `DataDownload`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:69:10:10:`    const wrapper = mountWithTheme(&lt;DataDownload params={mockRouteParams} /&gt;);`"/> gets wrapped with a `<ThemeProvider>`.

Here we validate that given a `Valid`<swm-token data-swm-token=":tests/js/spec/views/dataExport/dataDownload.spec.jsx:67:9:9:`    const status = DownloadStatus.Valid;`"/> status, the button appears as expected.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 tests/js/spec/views/dataExport/dataDownload.spec.jsx
```javascript
⬜ 63         );
⬜ 64       });
⬜ 65     
🟩 66       it("should render the 'Valid' view when appropriate", function () {
🟩 67         const status = DownloadStatus.Valid;
🟩 68         getDataExportDetails({dateExpired, status});
🟩 69         const wrapper = mountWithTheme(<DataDownload params={mockRouteParams} />);
🟩 70         expect(wrapper.state('download')).toEqual({dateExpired, status});
🟩 71         expect(wrapper.find('Header').text()).toBe('All done.');
🟩 72         const buttonWrapper = wrapper.find('a[aria-label="Download CSV"]');
🟩 73         expect(buttonWrapper.text()).toBe('Download CSV');
🟩 74         expect(buttonWrapper.prop('href')).toBe(
🟩 75           `/api/0/organizations/${mockRouteParams.orgId}/data-export/${mockRouteParams.dataExportId}/?download=true`
🟩 76         );
🟩 77         expect(wrapper.find('DateTime').prop('date')).toEqual(new Date(dateExpired));
🟩 78       });
⬜ 79     
⬜ 80       it('should render the Open in Discover button when needed', function () {
⬜ 81         const status = DownloadStatus.Valid;
```

<br/>

## Endpoint

<br/>

To test the Endpoint itself, we create a class that inherits from `APITestCase`<swm-token data-swm-token=":tests/sentry/data_export/endpoints/test_data_export_details.py:14:4:4:`class DataExportDetailsTest(APITestCase):`"/> :
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 tests/sentry/data_export/endpoints/test_data_export_details.py
```python
⬜ 11     from sentry.testutils import APITestCase
⬜ 12     
⬜ 13     
🟩 14     class DataExportDetailsTest(APITestCase):
⬜ 15         endpoint = "sentry-api-0-organization-data-export-details"
```

<br/>

And then we can test the actual data being returned
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 tests/sentry/data_export/endpoints/test_data_export_details.py
```python
⬜ 17         def setUp(self):
⬜ 18             self.user = self.create_user()
⬜ 19             self.organization = self.create_organization(owner=self.user)
⬜ 20             self.login_as(user=self.user)
⬜ 21             self.data_export = ExportedData.objects.create(
⬜ 22                 user=self.user, organization=self.organization, query_type=0, query_info={"env": "test"}
⬜ 23             )
⬜ 24     
🟩 25         def test_content(self):
🟩 26             with self.feature("organizations:discover-query"):
🟩 27                 response = self.get_valid_response(self.organization.slug, self.data_export.id)
🟩 28             assert response.data["id"] == self.data_export.id
🟩 29             assert response.data["user"] == {
🟩 30                 "id": str(self.user.id),
🟩 31                 "email": self.user.email,
🟩 32                 "username": self.user.username,
🟩 33             }
🟩 34             assert response.data["dateCreated"] == self.data_export.date_added
🟩 35             assert response.data["query"] == {
🟩 36                 "type": ExportQueryType.as_str(self.data_export.query_type),
🟩 37                 "info": self.data_export.query_info,
🟩 38             }
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBZnJvbnRlbmQtc3dpbW0lM0ElM0FyaWNhcmRvbG9wZXpn/docs/d8v18).
