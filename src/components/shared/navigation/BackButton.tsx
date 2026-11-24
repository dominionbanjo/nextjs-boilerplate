import { ArrowLeft } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({
  onBackClick,
}: {
  onBackClick?: () => void;
}) {
  const router = useRouter();

  return (
    <Button
      type="button"
      className="rounded-full size-11! aspect-square bg-[#F0F0F0] hover:bg-[#F0F0F0]/80"
      size="lg"
      onClick={onBackClick ? onBackClick : () => router.back()}
    >
      <ArrowLeft size={24} color="#636363" />
    </Button>
  );
}

