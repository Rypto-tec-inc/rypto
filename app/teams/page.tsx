'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"

const TEAMS = {
  core: [
    {
      name: "Victor Edet Coleman",
      role: "CEO & Founder",
      department: "Executive",
      bio: "Visionary leader driving Rypto's innovation strategy in Liberia and beyond",
      image: "/images/team/placeholder-1.jpg",
      linkedin: "https://linkedin.com/in/victor-coleman",
      twitter: "https://twitter.com/victorcoleman",
      skills: ["Leadership", "Strategy", "Business Development"],
      email: "victor@ryptotec.com"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      department: "Technology",
      bio: "Technical expert specializing in AI and blockchain technologies",
      image: "/images/team/placeholder-2.jpg",
      linkedin: "https://linkedin.com/in/sarah-johnson",
      twitter: "https://twitter.com/sarahjohnson",
      skills: ["AI", "Blockchain", "Cloud Architecture"],
      email: "sarah@ryptotec.com"
    },
    {
      name: "Michael Osei",
      role: "Lead Software Engineer",
      department: "Engineering",
      bio: "Innovative developer with expertise in full-stack development",
      image: "/images/team/placeholder-3.jpg",
      linkedin: "https://linkedin.com/in/michaelosei",
      twitter: "https://twitter.com/michaelosei",
      skills: ["Full-Stack", "React", "Node.js"],
      email: "michael@ryptotec.com"
    },
    {
      name: "Emma Nkosi",
      role: "Product Manager",
      department: "Product",
      bio: "Strategic product leader driving user-centric innovation",
      image: "/images/team/placeholder-4.jpg",
      linkedin: "https://linkedin.com/in/emmankosi",
      twitter: "https://twitter.com/emmankosi",
      skills: ["Product Strategy", "UX Design", "Agile Methodology"],
      email: "emma@ryptotec.com"
    }
  ],
  studio: [
    {
      name: "Alex Rodriguez",
      role: "Creative Director",
      department: "Rypto Studio",
      bio: "Award-winning designer leading our creative innovations",
      image: "/images/team/placeholder-5.jpg",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      twitter: "https://twitter.com/alexrodriguez",
      skills: ["Design", "Animation", "Creative Strategy"],
      email: "alex@ryptostudio.com"
    },
    {
      name: "Maria Chen",
      role: "Senior Animator",
      department: "Rypto Studio",
      bio: "3D animation expert with a passion for storytelling",
      image: "/images/team/placeholder-6.jpg",
      linkedin: "https://linkedin.com/in/mariachen",
      twitter: "https://twitter.com/mariachen",
      skills: ["3D Animation", "Character Design", "Visual Effects"],
      email: "maria@ryptostudio.com"
    },
    {
      name: "Marcus Wong",
      role: "Creative Director",
      department: "Rypto Studio",
      bio: "Leading design and creative innovations at Rypto Studio",
      image: "/images/team/marcus-wong.jpg",
      skills: ["Creative Direction", "Design Innovation"],
      email: "marcus.wong@ryptotec.com",
      linkedin: "https://linkedin.com/in/marcuswong",
      twitter: "https://twitter.com/marcuswong"
    }
  ],
  tech: [
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Technical architect behind Rypto's cutting-edge solutions",
      image: "/team/sarah-chen.jpg"
    }
  ]
}

type TeamMember = {
  name: string
  role: string
  department?: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  skills?: string[]
  email?: string
}

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Type guard to handle members with partial properties
  const isFullTeamMember = (member: any): member is TeamMember => {
    return (
      typeof member.name === 'string' &&
      typeof member.role === 'string' &&
      typeof member.bio === 'string' &&
      typeof member.image === 'string'
    )
  }

  // Combine all teams into a single array
  const allTeamMembers = [
    ...TEAMS.core,
    ...TEAMS.studio,
    ...TEAMS.tech
  ]

  // Filter team members
  const filteredMembers = allTeamMembers.filter(isFullTeamMember).filter(member => 
    (selectedDepartment === 'all' || (member.department || '').toLowerCase() === selectedDepartment) &&
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
     member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||  
     (member.skills || []).some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||  
     (member.department || '').toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Meet the Innovators Behind Rypto
      </motion.h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
        <Input 
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 mr-4"
        />
        <Select 
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {Array.from(new Set(allTeamMembers
              .filter(isFullTeamMember)
              .map(member => (member.department || '').toLowerCase())
              .filter(dept => dept !== '')
            )).map(dept => (
              <SelectItem key={dept} value={dept}>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.filter(isFullTeamMember).map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100 
              }}
              onClick={() => setSelectedMember(member)}
              className="cursor-pointer"
            >
              <Card className="group overflow-hidden shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                <CardHeader className="p-0 relative h-64 overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {member.twitter && (
                      <a 
                        href={member.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <CardTitle className="text-xl font-semibold mb-2">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.bio.slice(0, 100)}...</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Member Details Modal */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedMember.name}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedMember.role}
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Image 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  width={300} 
                  height={300} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-lg mb-4">{selectedMember.bio}</p>
                {selectedMember.skills && selectedMember.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMember.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex space-x-4 mt-6">
                  {selectedMember.linkedin && (
                    <a 
                      href={selectedMember.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:text-primary/80"
                    >
                      LinkedIn
                    </a>
                  )}
                  {selectedMember.twitter && (
                    <a 
                      href={selectedMember.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:text-primary/80"
                    >
                      Twitter
                    </a>
                  )}
                  {selectedMember.email && (
                    <a 
                      href={`mailto:${selectedMember.email}`} 
                      className="text-primary hover:text-primary/80"
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
