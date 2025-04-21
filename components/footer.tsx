'use client';

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/seperator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Σχετικά με εμάς</h3>
            <p className="text-gray-600">
              Mια πλατφόρμα ηλεκτρονικής ψηφοφορίας που επιτρέπει 
              την ασφαλή και αξιόπιστη διεξαγωγή ψηφοφοριών.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Επικοινωνία</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <span>Αθήνα, Ελλάδα</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={18} />
                <span>+30 210 1234567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={18} />
                <span>info@electionsphere.gr</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ακολουθήστε μας</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {currentYear}  Με επιφύλαξη παντός δικαιώματος.</p>
        </div>
      </div>
    </footer>
  );
}
