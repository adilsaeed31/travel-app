import {useQueries} from '@tanstack/react-query'

import {getMasterData} from '@Api'

type masterDataProps = {
  occupation?: string
  country?: string
  job?: string
}

const useMasterData = ({country, job, occupation}: masterDataProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['countries'],
        queryFn: () => getMasterData('countries'),
        staleTime: Infinity,
      },
      {
        queryKey: ['currencies'],
        queryFn: () => getMasterData('currencies'),
        staleTime: Infinity,
      },
      {
        queryKey: ['nationalities'],
        queryFn: () => getMasterData('nationalities'),
        staleTime: Infinity,
      },
      {
        queryKey: ['jobOccupations'],
        queryFn: () => getMasterData('job/occupations'),
        staleTime: Infinity,
      },
      {
        queryKey: ['jobCategories'],
        queryFn: () => getMasterData('job/categories'),
        staleTime: Infinity,
      },
      {
        queryKey: ['educationLevels'],
        queryFn: () => getMasterData('education/levels'),
        staleTime: Infinity,
      },
      {
        queryKey: ['citiesByCountry', country],
        queryFn: () => getMasterData(`countries/${country}/cities`),
        staleTime: Infinity,
      },
      {
        queryKey: ['sectoryByJob', job],
        queryFn: () => getMasterData(`job/categories/${job}/sectors`),
        staleTime: Infinity,
        enabled: !!job,
      },
      {
        queryKey: ['additionalIncomeSource', job],
        queryFn: () =>
          getMasterData('job/occupations/income/source/additional'),
        staleTime: Infinity,
      },
      {
        queryKey: ['primaryIncomeSources', occupation],
        queryFn: () =>
          getMasterData(`job/occupations/${occupation}/income/source`),
        staleTime: Infinity,
        enabled: !!occupation,
      },
    ],
  })

  return {
    countries: {...results[0]},
    currencies: {...results[1]},
    nationalities: {...results[2]},
    jobOccupations: {...results[3]},
    jobCategories: {...results[4]},
    educationLevels: {...results[5]},
    cities: {...results[6]},
    sectors: {...results[7]},
    additionalIncomes: {...results[8]},
    primaryIncomeSources: {...results[9]},
  }
}

export default useMasterData
