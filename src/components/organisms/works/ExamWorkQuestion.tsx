import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ExamWorkQuestion = () => {
  return (
    <div className="flex w-3/4 flex-col gap-3">
      <div className="h-full w-full rounded-xl bg-background p-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam amet cumque placeat unde laboriosam voluptatum
        nemo laborum mollitia dolorum? Rem consequuntur ratione ex soluta corporis dolorum, assumenda eos id labore
        magni! Officiis, nostrum dolores similique unde aliquid repellendus voluptates, facere pariatur possimus placeat
        necessitatibus consequuntur! Rerum odit nam maiores voluptatem molestias similique ullam ex fugiat, placeat
        repellat, vero optio in dicta commodi porro, quisquam tempore sunt inventore repellendus! Est quas ullam
        distinctio maiores vero voluptatem ratione repudiandae nihil fugit ipsam eligendi dolor alias, ipsum eveniet
        possimus omnis voluptatibus repellendus, aliquam molestiae hic nisi doloribus. Doloribus accusantium nam animi
        vitae eaque.
      </div>
      <div className="flex w-full justify-center gap-6 rounded-xl bg-background p-5">
        <Button disabled size={'sm'} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Sebelumnya</span>
        </Button>
        <Button size={'sm'} variant={'secondary'} className="cursor-pointer">
          <span>Ragu-Ragu</span>
        </Button>
        <Button size={'sm'} className="flex items-center">
          <span>Selanjutnya</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ExamWorkQuestion
