"use client";

import { continueWithFacebook, continueWithGoogle } from "@/utils";
import { SocialButton, HR } from "@/components/common";
import { Facebook, Google } from "@/components/icons";

export default function SocialButtons() {
  return (
    <div className="">
      <HR>
        <p>Or</p>
      </HR>
      <div className="flex flex-col gap-2">
        <SocialButton onPress={continueWithGoogle}>
          <Google size="w-4 h-4" />
          <span className="ml-2">Continue with Google</span>
        </SocialButton>
        <SocialButton onPress={continueWithFacebook}>
          <Facebook size="w-4 h-4" />
          <span className="ml-2">Continue with Facebook</span>
        </SocialButton>
      </div>
    </div>
  );
}
