# Notes

- Lighthouse CI
- Bundle Analyzer
- global i18n integration
- revert working hours settings to the default
- hendle all errors and loading
- changes in the backend settings ( i need a full docs and no html returned )

## Tech Dept

- REVISIT workign hours data
- check `i18n-ally-key-missing`
- validate the query params with ZOD
- check if working hours is working for all pages ( and also check refetching everytime the user visits the page)
- what if user didn't grant the permissions

- you should unify the error message returned from the absher api
- don't attach any domain to the meeting URL
- keep calling even after the call ended
- working hours messages
- why error in sendOtp show the whole page error ( likely backend response error handling )
- build reusable themed components
- check every network request Error && success

## To Be Seen

- Global Error Handling
- Config page issues
- data in URL is dangerous
- call page height
- azure Arabic translations
- change favicon
- Reusable hook form controllers
- Theming the right way
- Loading Skeletons
- Working hours messages && check working hours in the Call page && interval checking
- Tenstack Queries inside hooks
- Global ZOD error handling
- SBC new App
- Check URL long query string
- footer 2024
- Revisit app based locale messages and delete them from shared
- azure lib changing classes when update deps in some updates
- [awesome responsive Tailwind](https://fluid.tw/) fluid-tailwind: Fluid extractor not found in your Tailwind config
