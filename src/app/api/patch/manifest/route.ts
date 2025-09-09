import { NextResponse } from 'next/server';
import {
  patchSiteManifest,
  PatchManifestResponse,
} from '@/patch/patchSiteManifest';

export async function GET(): Promise<NextResponse<PatchManifestResponse>> {
  try {
    // Transform the manifest to a more API-friendly format
    const apiManifest = patchSiteManifest.map(section => ({
      id: section.id,
      title: section.title,
      path: section.path,
      scrollTarget: section.scrollTarget,
      category: section.category,
      description: section.description,
      keywords: section.keywords,
    }));

    return NextResponse.json({
      success: true,
      data: apiManifest,
      count: apiManifest.length,
    });
  } catch (error) {
    console.error('Error fetching patch manifest:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        count: 0,
        error: 'Failed to fetch site manifest',
      },
      { status: 500 }
    );
  }
}
