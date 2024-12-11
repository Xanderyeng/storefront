import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="mt-4 h-4 w-2/3" />
        <Skeleton className="mt-2 h-4 w-1/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

