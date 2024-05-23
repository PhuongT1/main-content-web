import { StepActivity } from '@/types/deck.type'
import { atom } from 'recoil'

export type SloganAtomType = [StepActivity<[]>, StepActivity<[]>]

export const SloganAtom = atom<SloganAtomType>({
  key: 'sloganStep',
  default: [] as unknown as SloganAtomType
  //   step1: {
  //     brandName: 'ken',
  //     idea: 'sushi',
  //     referenceSlogan: [
  //       {
  //         en: 'Ken, adding a twist to your sushi experience!',
  //         kr: '켄, 새로운 회전으로 당신의 스시 경험을 더하다!'
  //       },
  //       {
  //         en: 'Experience the art of sushi with Ken!',
  //         kr: '켄과 함께 스시의 예술을 체험하세요!'
  //       },
  //       {
  //         en: 'Ken, exploring the taste of sushi together',
  //         kr: '켄, 대단히 스시의 맛을 함께 탐험하다'
  //       },
  //       {
  //         en: "Ken's sushi, a journey of taste!",
  //         kr: '켄의 스시, 맛의 여행!'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!'
  //       }
  //     ],
  //     conceptID: 1,
  //     referenceSloganAI: [
  //       {
  //         en: 'Ken, adding a twist to your sushi experience!',
  //         kr: '켄, 새로운 회전으로 당신의 스시 경험을 더하다!'
  //       },
  //       {
  //         en: 'Experience the art of sushi with Ken!',
  //         kr: '켄과 함께 스시의 예술을 체험하세요!'
  //       },
  //       {
  //         en: 'Ken, exploring the taste of sushi together',
  //         kr: '켄, 대단히 스시의 맛을 함께 탐험하다'
  //       },
  //       {
  //         en: "Ken's sushi, a journey of taste!",
  //         kr: '켄의 스시, 맛의 여행!'
  //       },
  //       {
  //         en: 'Appetising sushi, only with Ken!',
  //         kr: '매력적인 스시, 오직 켄과 함께!'
  //       },
  //       {
  //         en: 'Ken, bringing sushi to your table!',
  //         kr: '켄, 당신의 테이블에 스시를 가져다!'
  //       },
  //       {
  //         en: "Ken's sushi, one bite is never enough!",
  //         kr: '켄의 스시, 한입은 절대 충분하지 않다!'
  //       },
  //       {
  //         en: 'Sushi redefined by Ken!',
  //         kr: '스시의 새롭게 정의되는 켄!'
  //       },
  //       {
  //         en: 'Indulge in sushi delight with Ken!',
  //         kr: '켄과 함께 스시의 즐거움을 만끽하세요!'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!2'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!3'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!4'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!5'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!6'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!7'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!8'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!9'
  //       },
  //       {
  //         en: 'Ken, your sushi destination!',
  //         kr: '켄, 당신의 스시 목적지!10'
  //       }
  //     ]
  //   },
  //   step2: {
  //     addSlogan: '',
  //     userSlogan: [
  //       {
  //         value: '켄, 새로운 회전으로 당신의 스시 경험을 더하다!',
  //         isActive: false,
  //         point: []
  //       },
  //       {
  //         value: ' 켄, 당신의 스시 목적지!8',
  //         isActive: false,
  //         point: []
  //       },
  //       {
  //         value: ' 켄, 당신의 스시 목적지!10  켄, 당신의 스시 목적지!9',
  //         isActive: false,
  //         point: []
  //       }
  //     ]
  //   }
  // }
})
