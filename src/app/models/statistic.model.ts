export interface StatisticsResponse {
    continent: string
    country: string
    population: number
    cases: Cases
    deaths: Deaths
    tests: Tests
    day: string
    time: string
  }
  
  export interface Cases {
    new: any
    active: number
    critical: any
    recovered: number
    "1M_pop": string
    total: number
  }
  
  export interface Deaths {
    new: any
    "1M_pop": any
    total: any
  }
  
  export interface Tests {
    "1M_pop": any
    total: any
  }
  