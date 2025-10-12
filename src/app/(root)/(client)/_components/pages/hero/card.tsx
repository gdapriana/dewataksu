"use client";
import { cn } from "@/lib/utils";
import {
  DestinationRelation,
  MainSchema,
  StoryRelation,
  TraditionRelation,
} from "@/utils/types";
import { useState } from "react";
import { motion as m } from "motion/react";
import Image from "next/image";
import EmptyImage from "@/app/(root)/(client)/_components/empty/image";
import { globalEase } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroPageCardWrapper({
  items,
  schema,
}: {
  schema: MainSchema;
  items: {
    destinations?: DestinationRelation[];
    traditions?: TraditionRelation[];
    stories?: StoryRelation[];
  };
}) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  return (
    <div className="w-full">
      {/* DESKTOP */}
      <div className="hidden gap-2 justify-center items-center md:flex h-[400px]">
        {schema === "destinations" &&
          items.destinations &&
          items.destinations.map((item: DestinationRelation, idx: number) => (
            <m.article
              animate={idx === activeIdx ? { flex: 4 } : { flex: 1 }}
              transition={{ duration: 1, ease: globalEase }}
              onMouseEnter={() => setActiveIdx(idx)}
              className={cn(
                "h-full flex-1 rounded-4xl relative flex border overflow-hidden"
              )}
              key={item.id}
            >
              <DestinationCard activeIdx={activeIdx} idx={idx} item={item} />
            </m.article>
          ))}
        {schema === "traditions" &&
          items.traditions &&
          items.traditions.map((item: TraditionRelation, idx: number) => (
            <m.article
              animate={idx === activeIdx ? { flex: 4 } : { flex: 1 }}
              transition={{ duration: 1, ease: globalEase }}
              onMouseEnter={() => setActiveIdx(idx)}
              className={cn(
                "h-full flex-1 rounded-4xl relative flex border overflow-hidden"
              )}
              key={item.id}
            >
              <TraditionCard activeIdx={activeIdx} idx={idx} item={item} />
            </m.article>
          ))}

        {schema === "stories" &&
          items.stories &&
          items.stories.map((item: StoryRelation, idx: number) => (
            <m.article
              animate={idx === activeIdx ? { flex: 4 } : { flex: 1 }}
              transition={{ duration: 1, ease: globalEase }}
              onMouseEnter={() => setActiveIdx(idx)}
              className={cn(
                "h-full flex-1 rounded-4xl relative flex border overflow-hidden"
              )}
              key={item.id}
            >
              <StoryCard activeIdx={activeIdx} idx={idx} item={item} />
            </m.article>
          ))}
      </div>
      {/* DESKTOP END */}

      {/* MOBILE */}
      <div className="flex absolute left-0 w-full md:hidden h-[400px]">
        <Swiper
          onSlideChange={(swiper) => setActiveIdx(swiper.activeIndex)}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          centeredSlides={true}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {schema === "destinations" &&
            items.destinations?.map(
              (item: DestinationRelation, idx: number) => (
                <SwiperSlide key={item.id}>
                  <DestinationCard
                    isMobile
                    activeIdx={activeIdx}
                    item={item}
                    idx={idx}
                  />
                </SwiperSlide>
              )
            )}
          {schema === "traditions" &&
            items.traditions?.map((item: TraditionRelation, idx: number) => (
              <SwiperSlide className="" key={item.id}>
                <TraditionCard
                  isMobile
                  activeIdx={activeIdx}
                  idx={idx}
                  item={item}
                />
              </SwiperSlide>
            ))}
          {schema === "stories" &&
            items.stories?.map((item: StoryRelation, idx: number) => (
              <SwiperSlide key={item.id}>
                <StoryCard
                  isMobile
                  activeIdx={activeIdx}
                  idx={idx}
                  item={item}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* MOBILE END*/}
    </div>
  );
}

function DestinationCard({
  isMobile,
  idx,
  activeIdx,
  item,
}: {
  isMobile?: boolean;
  idx: number;
  activeIdx: number;
  item: DestinationRelation;
}) {
  return (
    <div className="w-full h-full rounded-lg">
      {item?.cover?.url ? (
        <Image
          loading="lazy"
          width={500}
          height={500}
          className={cn(
            "w-full h-full z-[1] object-cover",
            idx !== activeIdx && "grayscale",
            isMobile && "rounded-none"
          )}
          src={item.cover?.url}
          alt={item.name}
        />
      ) : (
        <EmptyImage
          className={{ wrapper: `z-[1] h-full ${isMobile && "rounded-none"}` }}
        />
      )}
      <m.div
        animate={
          idx === activeIdx
            ? { bottom: 0, opacity: 1 }
            : { bottom: "-100%", opacity: 0 }
        }
        transition={{ duration: 1, ease: globalEase }}
        className="z-[2] p-3 bottom-[-100%] absolute left-0 w-full"
      >
        <div className="bg-background p-4 pl-8 gap-4 rounded-full flex justify-center items-stretch">
          <div className="flex flex-col gap-1 flex-1 justify-center items-start">
            <h3 className="line-clamp-1 font-bold">{item.name}</h3>
            <div className="flex gap-1 justify-start items-center">
              <Badge variant="outline">{item._count.views} Views</Badge>
              <Badge variant="outline">
                <Heart />
                {item._count.likes}
              </Badge>
            </div>
          </div>
          <Link
            href={`/destinations/${item.slug}`}
            className="flex justify-center w-16 items-center rounded-full aspect-[1/1] bg-primary"
          >
            <ArrowRight className="text-background" />
          </Link>
        </div>
      </m.div>
    </div>
  );
}

function TraditionCard({
  idx,
  isMobile,
  activeIdx,
  item,
}: {
  isMobile?: boolean;
  idx: number;
  activeIdx: number;
  item: TraditionRelation;
}) {
  return (
    <div className={cn("h-full rounded-lg", isMobile && "rounded-none")}>
      {item?.cover?.url ? (
        <Image
          loading="lazy"
          width={500}
          height={500}
          className={cn(
            "w-full h-full z-[1] object-cover",
            idx !== activeIdx && "grayscale"
          )}
          src={item.cover?.url}
          alt={item.name}
        />
      ) : (
        <EmptyImage
          className={{
            wrapper: `z-[1] h-full ${isMobile ? "rounded-none" : "rounded-xl"}`,
          }}
        />
      )}
      <m.div
        animate={
          idx === activeIdx
            ? { bottom: 0, opacity: 1 }
            : { bottom: "-100%", opacity: 0 }
        }
        transition={{ duration: 1, ease: globalEase }}
        className="z-[2] p-3 bottom-[-100%] absolute left-0 w-full"
      >
        <div className="bg-background p-4 pl-8 gap-4 rounded-full flex justify-center items-stretch">
          <div className="flex flex-col gap-1 flex-1 justify-center items-start">
            <h3 className="line-clamp-1 font-bold">{item.name}</h3>
            <div className="flex gap-1 justify-start items-center">
              <Badge variant="outline">{item._count.views} Views</Badge>
              <Badge variant="outline">
                <Heart />
                {item._count.likes}
              </Badge>
            </div>
          </div>
          <Link
            href={`/destinations/${item.slug}`}
            className="flex justify-center w-16 items-center rounded-full aspect-[1/1] bg-primary"
          >
            <ArrowRight className="text-background" />
          </Link>
        </div>
      </m.div>
    </div>
  );
}

function StoryCard({
  isMobile,
  idx,
  activeIdx,
  item,
}: {
  isMobile?: boolean;
  idx: number;
  activeIdx: number;
  item: StoryRelation;
}) {
  return (
    <div className="w-full h-full rounded-lg">
      {item?.cover?.url ? (
        <Image
          loading="lazy"
          width={500}
          height={500}
          className={cn(
            "w-full h-full z-[1] object-cover",
            idx !== activeIdx && "grayscale",
            isMobile && "rounded-none"
          )}
          src={item.cover?.url}
          alt={item.name}
        />
      ) : (
        <EmptyImage
          className={{ wrapper: `z-[1] h-full ${isMobile && "rounded-none"}` }}
        />
      )}
      <m.div
        animate={
          idx === activeIdx
            ? { bottom: 0, opacity: 1 }
            : { bottom: "-100%", opacity: 0 }
        }
        transition={{ duration: 1, ease: globalEase }}
        className="z-[2] p-3 bottom-[-100%] absolute left-0 w-full"
      >
        <div className="bg-background p-4 pl-8 gap-4 rounded-full flex justify-center items-stretch">
          <div className="flex flex-col flex-1 justify-center items-start">
            <h3 className="line-clamp-1 font-bold">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              By {item.author.name}
            </p>
            <div className="flex gap-1 justify-start items-center">
              <Badge variant="outline">{item._count.views} Views</Badge>
              <Badge variant="outline">
                <Heart />
                {item._count.likes}
              </Badge>
            </div>
          </div>
          <Link
            href={`/destinations/${item.slug}`}
            className="flex justify-center w-16 items-center rounded-full aspect-[1/1] bg-primary"
          >
            <ArrowRight className="text-background" />
          </Link>
        </div>
      </m.div>
    </div>
  );
}
