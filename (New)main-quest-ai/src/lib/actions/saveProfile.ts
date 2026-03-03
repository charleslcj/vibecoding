import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { BuyerProfile, DealMatch } from '../../types';

export async function saveBuyerProfile(
  userId: string | null,
  sessionId: string,
  answers: Record<string, string[]>,
  profile: BuyerProfile,
  email?: string
) {
  try {
    const docRef = await addDoc(collection(db, "buyer_profiles"), {
      userId,
      sessionId,
      answers,
      archetype: profile.archetype,
      stats: profile.stats,
      businessMatches: profile.businessMatches,
      operatorSummary: profile.operatorSummary,
      purchasingPower: profile.purchasingPower,
      createdAt: new Date().toISOString(),
      email: email || null
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving buyer profile:", error);
    throw error;
  }
}

export async function saveEmailLead(
  email: string,
  profile: BuyerProfile,
  profileId?: string
) {
  try {
    await setDoc(doc(db, "email_leads", email), {
      email,
      archetype: profile.archetype,
      capitalBand: profile.buyerProfile.capitalBand,
      purchasingPower: profile.purchasingPower,
      profileId: profileId || null,
      source: "main_quest_ai",
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving email lead:", error);
    throw error;
  }
}

export async function saveDeal(
  sessionId: string,
  deal: DealMatch
) {
  try {
    await addDoc(collection(db, "saved_deals"), {
      sessionId,
      dealId: deal.id,
      dealTitle: deal.title,
      dealEbitda: deal.annualEbitda,
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving deal:", error);
    throw error;
  }
}

export async function saveSellerListing(
  formData: any
) {
  try {
    await addDoc(collection(db, "seller_listings"), {
      ...formData,
      status: "pending_review",
      submittedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving seller listing:", error);
    throw error;
  }
}
