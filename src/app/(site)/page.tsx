import AmbianceCollageBanner from "@/components/site/AmbianceCollageBanner";
import AttireBoard from "@/components/site/AttireBoard";
import BridalPartyGrid from "@/components/site/BridalPartyGrid";
import FAQAccordion from "@/components/site/FAQAccordion";
import GalleryGrid from "@/components/site/GalleryGrid";
import Hero from "@/components/site/Hero";
import Registry from "@/components/site/Registry";
import ScheduleCards from "@/components/site/ScheduleCards";
import Section from "@/components/site/Section";
import Timeline from "@/components/site/Timeline";
import TravelStay from "@/components/site/TravelStay";
import { ambiance1Images, ambiance2Images } from "@/data/ambiance";
import { bridalPartyMembers } from "@/data/bridalParty";
import { faqItems } from "@/data/faqs";
import { galleryImages } from "@/data/gallery";
import { scheduleItems } from "@/data/schedule";
import { timelineEvents } from "@/data/timeline";

export default function WeddingSitePage() {
  return (
    <>
      <Hero />

      <Section
        id='schedule'
        eyebrow='Wedding Program'
        title='Wedding Program'
        description='A simple flow for the day: ceremony, cocktail hour, and reception.'
      >
        <ScheduleCards items={scheduleItems} />
      </Section>
      <AmbianceCollageBanner images={ambiance1Images} />

      <Section
        id='travel'
        eyebrow='Travel & Stay'
        title='Getting to the valley'
        description='Everything you need for flights, local transport, places to stay, and ideas while you are in town.'
        className='bg-cream/55'
      >
        <TravelStay />
      </Section>

      <Section
        id='rsvp'
        eyebrow='RSVP'
        title='We would love to celebrate with you'
        description='Please send your details below. This form is frontend-only for now.'
      >
        <AmbianceCollageBanner
          images={ambiance2Images}
          showText={false}
          firstImageClassName='object-[50%_30%]'
          secondImageClassName='object-[50%_30%]'
          fourthImageClassName='object-[50%_70%]'
          overlayHref='https://nicolash.co.uk/rsvp'
          overlayLabel='RSVP'
          wrapInSection={false}
        />
      </Section>

      <Section
        id='registry'
        eyebrow='Registry / Gifts'
        title=''
        description=''
        className='bg-cream/55'
      >
        <Registry />
      </Section>

      <Section
        id='attire'
        eyebrow='Attire'
        title='What to wear'
        description='Use our Pinterest board for outfit inspiration.'
      >
        <AttireBoard />
      </Section>

      <Section
        id='faqs'
        eyebrow='FAQs'
        title='Quick answers'
        description='If we missed anything, send us a note and we will update this section.'
      >
        <FAQAccordion items={faqItems} />
      </Section>

      <Section
        id='gallery'
        eyebrow='Gallery'
        title='A few moments so far'
        description='A small collection while we count down to 1 April 2026.'
        className='bg-cream/60'
        hideHeader
      >
        <GalleryGrid images={galleryImages} />
      </Section>

      <Section
        id='our-story'
        eyebrow='Our Story'
        title='A steady kind of love'
        description='From Swakop to Cape Town, back home, and now to one table at Nibbana Farm, Boontjiesrivier Rd Wolseley.'
      >
        <Timeline events={timelineEvents} />
      </Section>

      <Section
        id='bridal-party'
        eyebrow='Bridal Party'
        title='By our side'
        description=''
        className='bg-petal/70'
      >
        <BridalPartyGrid members={bridalPartyMembers} />
      </Section>
    </>
  );
}
