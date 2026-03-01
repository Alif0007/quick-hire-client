import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessAlert({
    title = "Success!",
    message,
    onClose,
    icon = CheckCircle,
    iconColor = "text-green-500"
}) {
    const IconComponent = icon;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.5
                }}
            >
                <motion.div
                    className={iconColor + " mx-auto mb-4"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2
                    }}
                >
                    <IconComponent className="h-16 w-16 mx-auto" />
                </motion.div>

                <motion.h3
                    className="text-xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {title}
                </motion.h3>

                <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {message}
                </motion.p>

                <motion.button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Close
                </motion.button>
            </motion.div>
        </div>
    );
}