import React, { useState, useRef, useEffect } from 'react';
import { Download, Award, Monitor, LayoutDashboard } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';

function Certificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCallMadeRef = useRef(false);

  useEffect(() => {
    const initializeCertificate = async () => {
      try {
        const testInfo = location.state?.testInfo;

        if (!testInfo?.userName || !testInfo?.courseName) {
          navigate('/my-dashbaord', { replace: true });
          return;
        }

        const certificateKey = `cert_${testInfo.courseName}_${testInfo.userName}`;
        const isCertificateSent = localStorage.getItem(certificateKey);

        if (isCertificateSent) {
          navigate('/my-dashbaord', { replace: true });
          return;
        }

        setCertificateData(testInfo);

        if (!apiCallMadeRef.current) {
          apiCallMadeRef.current = true;
          const token = localStorage.getItem("token");
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user/certificate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              userName: testInfo.userName,
              courseName: testInfo.courseName,
              rank: 20,
              Date: new Date().toISOString(),
            }),
          });
          console.log(response);
          if (response.ok) {
            localStorage.setItem(certificateKey, 'true');
          } else {
            throw new Error('Failed to send certificate details');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        navigate('/my-dashbaord', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    initializeCertificate();

    const handleResize = () => {
      setShowMobileModal(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.history.replaceState({}, document.title);
    };
  }, [location.state, navigate]);

  const downloadCertificate = async () => {
    if (!certificateRef.current || !certificateData) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${certificateData.userName}-certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const handleDashboardClick = () => {
    navigate('/my-dashbaord', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">An error occurred: {error}</div>
      </div>
    );
  }

  if (showMobileModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center space-y-4">
          <Monitor className="w-12 h-12 text-blue-600 mx-auto" />
          <h3 className="text-xl font-bold text-gray-900">Please Use Desktop</h3>
          <p className="text-gray-600">
            For the best certificate generation experience, please switch to a desktop device.
          </p>
        </div>
      </div>
    );
  }

  if (!certificateData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div ref={certificateRef} className="bg-white p-12 rounded-xl shadow-2xl border-8 border-double border-blue-100">
          {/* Header */}
          <div className="text-center mb-10">
            <img src="/logo-logo.jpg" alt="EduAI Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-serif text-blue-900 mb-2">Certificate of Excellence</h1>
            <div className="h-0.5 w-32 bg-blue-200 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 mb-12">
            <p className="text-gray-600 text-lg">This is to certify that</p>
            <h2 className="text-3xl font-serif text-blue-900 font-bold border-b-2 border-blue-100 inline-block px-4 py-2">
              {certificateData.userName}
            </h2>
            <p className="text-gray-600 text-lg">has successfully completed the course</p>
            <h3 className="text-2xl font-bold text-blue-800">{certificateData.courseName}</h3>
            <p className="text-gray-600">with distinction and demonstrated exceptional understanding of the subject matter</p>
          </div>

          {/* Date and ID */}
          <div className="text-center text-gray-600 mb-12">
            <p>Issued on: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p className="text-sm">Certificate ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-center px-12 mt-8">
            <div className="text-center">
              <img
                src="/signature.png"
                alt="CEO Signature"
                className="h-16 mb-2"
              />
              <div className="h-px w-48 bg-gray-300 mb-2"></div>
              <p className="font-semibold text-gray-700">Harsh singh baghel</p>
              <p className="text-gray-600 text-sm">Chief Executive Officer</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 relative">
                <Award className="w-full h-full text-blue-600" />
                <div className="absolute inset-0 bg-blue-100 rounded-full -z-10 opacity-20"></div>
              </div>
            </div>

            <div className="text-center">
              <img
                src="/signature.png"
                alt="Academic Director Signature"
                className="h-16 mb-2"
              />
              <div className="h-px w-48 bg-gray-300 mb-2"></div>
              <p className="font-semibold text-gray-700">Harsh singh baghel</p>
              <p className="text-gray-600 text-sm">Academic Director</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">Self Learning - Transforming Education Through AI</p>
            <p className="text-xs text-gray-400">Verify this certificate at www.eduai.com/verify</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={downloadCertificate}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
          <button
            onClick={handleDashboardClick}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg border border-blue-200"
          >
            <LayoutDashboard className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificate;