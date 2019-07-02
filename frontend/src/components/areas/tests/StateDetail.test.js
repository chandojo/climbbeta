import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import StateDetail, { loadDetails } from '../StateDetail.js';

//jest.mock('../StateDetail.js');

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('calls states api and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify({"id": 1, "name": "Washington", "cities": [ "Gold Bar", "Index" ], "abbrv": "WA", "slug": "washington", "img": "http://127.0.0.1:8000/media/areas/media/Index_aL4Eq1v.jpg" }))

    //assert on the response
   StateDetail.loadDetails(1).then(res => {
      expect(res.id).toEqual(1)
      expect(res.name).toEqual('Washington')
      expect(res.cities).toEqual(['Gold Bar', 'Index'])
      expect(res.abbrv).toEqual('WA')
      expect(res.slug).toEqual('washington')
      expect(res.img).toEqual('http://127.0.0.1:8000/media/areas/media/Index_aL4Eq1v.jpg')
    });

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/areas/api/states/1/')
  })
})
