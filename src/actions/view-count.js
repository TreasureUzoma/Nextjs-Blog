"use server";

import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc, getDoc, increment, setDoc, collection } from "firebase/firestore";
import { cookies } from "next/headers";

export const incrementPageMetrics = async (slug) => {
  try {
    if (!slug) return { error: "Slug is required" };

    const cookiesStore = await cookies();
    const visitedCookieName = `visited_${slug}`; // Unique cookie per slug

    const pageMetricsDocRef = doc(collection(db, "posts_metrics"), slug);

    const visitedCookie = cookiesStore.get(visitedCookieName);
    const docSnapshot = await getDoc(pageMetricsDocRef);

    if (!docSnapshot.exists()) {
      console.log(`First visit for ${slug}`);

      await setDoc(pageMetricsDocRef, {
        page_views: 1,
        unique_views: 1,
        created_at: new Date(),
      });

      cookiesStore.set(visitedCookieName, "true", {
        maxAge: 60 * 60 * 24 * 365, // 1 year expiration
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } else {
      if (!visitedCookie) {
        console.log(`First visit for ${slug}`);

        await updateDoc(pageMetricsDocRef, {
          page_views: increment(1),
          unique_views: increment(1),
        });

        cookiesStore.set(visitedCookieName, "true", {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      } else {
        console.log(`Returning visit for ${slug}`);

        await updateDoc(pageMetricsDocRef, {
          page_views: increment(1),
        });
      }
    }

    const updatedDocSnapshot = await getDoc(pageMetricsDocRef);

    if (!updatedDocSnapshot.exists()) {
      console.error("Page metrics document not found.");
      return { error: "Page metrics document not found." };
    }

    const metrics = updatedDocSnapshot.data();
    return {
      success: true,
      page_views: metrics.page_views,
      unique_views: metrics.unique_views,
    };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { error: "An unexpected error occurred." };
  }
};
