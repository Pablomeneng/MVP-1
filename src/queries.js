import { HttpError } from 'wasp/server'

export const getUserDocuments = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Document.findMany({
    where: {
      OR: [
        { createdById: userId },
        { clientId: userId }
      ]
    }
  });
}

export const getTemplatePlaceholders = async ({ templateId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const placeholders = await context.entities.Placeholder.findMany({
    where: { templateId }
  });

  return placeholders;
}
