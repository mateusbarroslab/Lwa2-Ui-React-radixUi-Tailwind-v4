import { z } from 'zod'

export const courseFormSchema = z.object({
  title: z.string().min(1, 'Obrigatório'),
  slug: z
    .string()
    .min(1, 'Obrigatório')
    .regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífens'),
  short_description: z.string().optional(),
  description: z.string().min(1, 'Obrigatório'),
  workload: z.string().optional(),
  category_id: z.string().min(1, 'Obrigatório'),
  is_active: z.boolean(),
  curriculum: z.string().optional(),

  regulatory_title: z.string().optional(),
  regulatory_link_text: z.string().optional(),
  regulatory_url: z.string().optional().or(z.literal('')),

  completion_time: z.string().optional(),
  national_validity: z.boolean().default(false),
  council_registration: z.string().optional(),
  technical_skill_title: z.string().optional(),
  technical_skill_subtitle: z.string().optional(),

  commercial_observation: z.string().optional(),
  material_included: z.boolean().default(false),
  fixed_monthly_fee: z.boolean().default(false),
  whatsapp_number: z.string().optional(),

  curriculum_json: z
    .array(
      z.object({
        title: z.string().min(1, 'Obrigatório'),
        items: z.array(z.object({ value: z.string().min(1, 'Obrigatório') })),
      }),
    )
    .default([]),

  benefits_json: z
    .array(
      z.object({
        id: z.string(),
        icon: z.string(),
        title: z.string().min(1, 'Obrigatório'),
        text: z.string().optional(),
        link: z.string().optional(),
        visible: z.boolean().default(true),
        order: z.number(),
      }),
    )
    .default([]),

  payment_options_json: z
    .array(
      z.object({
        id: z.string(),
        badge: z.string().optional(),
        title: z.string().min(1, 'Obrigatório'),
        old_price: z.string().optional(),
        current_price: z.string().min(1, 'Obrigatório'),
        description: z.string().optional(),
        observation: z.string().optional(),
        button_text: z.string().optional(),
        highlight: z.boolean().default(false),
        order: z.number(),
      }),
    )
    .default([]),
})

export type CourseFormValues = z.infer<typeof courseFormSchema>
