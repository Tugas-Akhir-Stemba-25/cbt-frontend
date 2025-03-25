import { Metadata } from 'next'

const defaultMetadataValues: Metadata = {
  title: 'LuminaQA - CBT System',
  description: 'LuminaQA adalah sistem Computer Based Test (CBT) yang memudahkan pengelolaan ujian berbasis komputer.'
}

export const defineMetadata = (metadata?: Metadata) => {
  const title = metadata?.title ? metadata.title : defaultMetadataValues.title
  return {
    ...defaultMetadataValues,
    ...metadata,
    title
  }
}
