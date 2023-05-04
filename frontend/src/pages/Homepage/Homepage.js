import React from 'react';
import { Instagram } from '../../components/Instagram/Instagram';
import { Testimonial } from '../../components/Testimonial/Testimonial';
import { Promotion } from '../../components/Promotion/Promotion';
import { Collection } from '../../components/Collection/Collection';
import { New_Arrival } from '../../components/New_Arrival/New_Arrival';
import { Service } from '../../components/Service/Service';
import { Slider } from '../../components/Slider/Slider';
export const Homepage = () => {
  return (
    <>
        <Slider/>
        <Service/>
        <New_Arrival />
        <Collection/>
        <Promotion/>
        <Testimonial />
        <Instagram />
    </>
  )
}
