export const trackArtistFilters = [
  {
    name: 'timeRange',
    label: 'Time range',
    type: 'select',
    initialValue: 'medium_term',
    options: [
      { label: 'Short term (~ 1 month)', value: 'short_term' },
      { label: 'Medium term (~ 6 month)', value: 'medium_term' },
      { label: 'Long term (Several years)', value: 'long_term' }
    ]
  }
]
