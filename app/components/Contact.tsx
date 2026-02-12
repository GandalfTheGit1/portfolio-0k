"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { useI18n } from "@/app/components/I18nProvider"
import { useState } from "react"

type TranslationFunction = {
  (key: string): string;
  <T = any>(key: string, options: { returnObjects: true }): T;
}

// Contact card component
const ContactCard = ({
  icon: Icon,
  title,
  content,
  link,
  delay,
  color = "indigo",
  connectText = "Connect",
  isEmail = false,
  copiedText = "Copied!"
}: {
  icon: any
  title: string
  content: string
  link: string
  delay: number
  color?: string
  connectText?: string
  isEmail?: boolean
  copiedText?: string
}) => {
  const [copied, setCopied] = useState(false)
  const colors = {
    indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 hover:border-indigo-500/50",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/50",
  }

  const bgColor = colors[color as keyof typeof colors] || colors.indigo

  const handleEmailClick = async (e: React.MouseEvent) => {
    if (isEmail) {
      e.preventDefault()
      try {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy email:', err)
      }
    }
  }

  return (
    <motion.div
      className={`bg-gradient-to-br ${bgColor} backdrop-blur-md p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 group shadow-lg ${isEmail ? 'cursor-pointer' : ''} relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={handleEmailClick}
    >
      {isEmail && (
        <div className="absolute top-2 right-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: copied ? 1 : 0, 
              scale: copied ? 1 : 0.8 
            }}
            transition={{ duration: 0.2 }}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"
          >
            {copiedText}
          </motion.div>
        </div>
      )}
      
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors duration-300">
        <Icon className={`w-8 h-8 text-${color}-400`} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 mb-4">{content}</p>
      <div className="flex items-center text-indigo-400 text-sm">
        <span>{copied ? copiedText : connectText}</span>
        <ExternalLink className={`w-4 h-4 ml-2 transition-opacity duration-300 ${isEmail ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const { t } = useI18n() as { t: TranslationFunction };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title={t('contact.sectionTitle')} />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <ContactCard
            icon={Mail}
            title={t('contact.email.title')}
            content="marrerow613@gmail.com"
            link="mailto:marrerow613@gmail.com"
            delay={0.1}
            color="indigo"
            connectText={t('contact.email.connect')}
            isEmail={true}
            copiedText={t('contact.email.copied')}
          />

          <ContactCard
            icon={Phone}
            title={t('contact.phone.title')}
            content="+53 5 841 91 39"
            link="tel:+5358419139"
            delay={0.2}
            color="blue"
            connectText={t('contact.phone.connect')}
          />

          <ContactCard 
            icon={MapPin} 
            title={t('contact.location.title')} 
            content="La Habana, Cuba" 
            link="#" 
            delay={0.3} 
            color="purple"
            connectText={t('contact.location.connect')}
          />
        </div>
      </div>
    </section>
  )
}
