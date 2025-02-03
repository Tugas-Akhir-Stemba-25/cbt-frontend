import { Metadata } from 'next'

const defaultMetadataValues: Metadata = {
  title: 'CBT',
  description: 'Aplikasi CBT (Computer Based Test) untuk membantu siswa belajar dengan mudah dan menyenangkan'
}

export const defineMetadata = (metadata?: Metadata) => {
  const title = metadata?.title ? metadata.title : defaultMetadataValues.title
  return {
    ...defaultMetadataValues,
    ...metadata,
    title
  }
}
