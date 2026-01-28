import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for inquiry
const inquirySchema = z.object({
  name: z.string().min(2, 'نام الزامی است'),
  company: z.string().optional(),
  phone: z.string().min(10, 'شماره تلفن معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست'),
  message: z.string().optional(),
  productId: z.string().optional(),
  productTitle: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const data = inquirySchema.parse(body)

    // In production, save to database and send notification email
    console.log('New inquiry received:', data)

    // Simulate database save
    const inquiry = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // TODO: Send notification email to admin
    // await sendEmail({
    //   to: 'info@hatefertebat.ir',
    //   subject: `درخواست قیمت جدید: ${data.productTitle}`,
    //   body: `...`
    // })

    return NextResponse.json({
      success: true,
      message: 'درخواست شما با موفقیت ثبت شد',
      data: { id: inquiry.id },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'اطلاعات وارد شده معتبر نیست',
          details: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'خطای سرور' },
      { status: 500 }
    )
  }
}
