import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ecoguideminiapp.vercel.app';
  
  const config = {
    accountAssociation: {
      header:
        process.env.FARCASTER_HEADER ||
        'eyJmaWQiOjcwODcwNywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDQwMTJGRmQzQmE5ZTJiRjY3NDIzNTFEQzJDNDE1NWFDRjBEZjVhZWUifQ',
      payload:
        process.env.FARCASTER_PAYLOAD ||
        'eyJkb21haW4iOiJlY29ndWlkZW1pbmlhcHAudmVyY2VsLmFwcCJ9',
      signature:
        process.env.FARCASTER_SIGNATURE ||
        'xyA30Oj/DSnqQbcntcGeMfZ5WHkuS3VIb69e4+zdf5lrC0AS7rUsfigkseW1/2YZQe5JBdeL8CqaEzhfeXhjVRs=',
    },
    miniapp: {
      version: '1',
      name: 'EcoGuide AI',
      iconUrl: `${baseUrl}/icon.png`,
      splashImageUrl: `${baseUrl}/splash.png`,
      splashBackgroundColor: '#10B981',
      homeUrl: baseUrl,
      imageUrl: `${baseUrl}/og-image.png`,
      buttonTitle: 'Start Coaching',
      heroImageUrl: `${baseUrl}/og-image.png`,
      webhookUrl: `${baseUrl}/api/webhook`,
      subtitle: 'Your AI Sustainability Coach',
      description: 'Personalized AI-powered sustainability recommendations tailored to your lifestyle and constraints.',
      screenshotUrls: [
        `${baseUrl}/screenshot1.jpg`,
        `${baseUrl}/screenshot2.jpg`,
        `${baseUrl}/screenshot3.jpg`,
      ],
      primaryCategory: 'lifestyle',
      tags: [
        "sustainability",
        "eco",
        "ai",
        "coaching",
        "environment"
      ],
      tagline: 'Your AI Sustainability Coach',
      ogTitle: 'EcoGuide AI - Your Sustainability Coach',
      ogDescription: 'Personalized AI-powered sustainability recommendations tailored to your lifestyle and constraints.',
      ogImageUrl: `${baseUrl}/og-image.png`,
      castShareUrl: baseUrl,
    },
    frame: {
      version: '1',
      name: 'EcoGuide AI',
      iconUrl: `${baseUrl}/icon.png`,
      splashImageUrl: `${baseUrl}/splash.png`,
      splashBackgroundColor: '#10B981',
      homeUrl: baseUrl,
      imageUrl: `${baseUrl}/og-image.png`,
      buttonTitle: 'Start Coaching',
      heroImageUrl: `${baseUrl}/og-image.png`,
      webhookUrl: `${baseUrl}/api/webhook`,
      subtitle: 'Your AI Sustainability Coach',
      description: 'Personalized AI-powered sustainability recommendations tailored to your lifestyle and constraints.',
      screenshotUrls: [
        `${baseUrl}/screenshot1.jpg`,
        `${baseUrl}/screenshot2.jpg`,
        `${baseUrl}/screenshot3.jpg`,
      ],
      primaryCategory: 'lifestyle',
      tags: [
        "sustainability",
        "eco",
        "ai",
        "coaching",
        "environment"
      ],
      tagline: 'Your AI Sustainability Coach',
      ogTitle: 'EcoGuide AI - Your Sustainability Coach',
      ogDescription: 'Personalized AI-powered sustainability recommendations tailored to your lifestyle and constraints.',
      ogImageUrl: `${baseUrl}/og-image.png`,
      castShareUrl: baseUrl,
    },
    baseBuilder: {
      allowedAddresses: process.env.BASE_BUILDER_ADDRESSES 
        ? process.env.BASE_BUILDER_ADDRESSES.split(',') 
        : [],
    },
  };

  return NextResponse.json(config);
}

export const runtime = 'edge';
