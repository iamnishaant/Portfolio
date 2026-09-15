# NISHANT SHAH

github.com/iamnishaant | linkedin.com/in/nishant-shah-638577256 | nishant108ns@gmail.com

## Summary

AI/CS undergraduate specializing in Machine Learning, Computer Vision, and AI Systems, with hands-on experience designing multi-agent architectures, retrieval pipelines, and edge-deployed AI solutions. Strong foundation in computer vision and neural network fundamentals, with project experience spanning healthcare, assistive intelligence, and conversational AI systems. Published patent applicant and conference presenter with a focus on building systems from first principles rather than off-the-shelf pipelines.

## Education

- **Amrita Vishwa Vidyapeetham, Amritapuri** (2023 – Present) — B.Tech in Computer Science Engineering (AI)
- **Bal Kalyan Vidhya Mandir Secondary School** (2020 – 2022) — +2, Computer Science

## Technical Skills

- **Machine Vision & Learning:** Computer Vision, Neural Networks, Deep Learning, Image Segmentation, Domain Adaptation, Model Interpretability (Grad-CAM), PyTorch, TensorFlow, OpenCV, Scikit-learn
- **AI Systems & Reasoning:** Retrieval-Augmented Generation (RAG), Multi-Agent Systems, Large Language Models (LLMs), Verification Pipelines, Knowledge Graphs, LangChain, LangGraph
- **Edge AI & Systems:** GPU-Optimized Inference, Edge AI Deployment, Raspberry Pi 5, Real-Time Embedded Systems
- **Software Engineering:** Python, Java, C, JavaScript, TypeScript, FastAPI, REST APIs, Microservices, Node.js, Express.js, React.js, JWT Authentication
- **Data Engineering & Infrastructure:** SQL, PySpark, Apache Spark, ETL, Data Pipelines, Parquet, Relational Database Design (normalization, indexing, query optimization), PostgreSQL, SQLite, MongoDB, Supabase, Docker, Kubernetes, AWS, Git, Linux

## Research & Project Experience

### Maritime Risk Intelligence System

*Feb 2026 – May 2026*

- Built a Spark-based data pipeline to ingest and process large-scale AIS vessel data, transforming raw records into structured Parquet datasets for downstream analytics.
- Developed a spatio-temporal data fusion pipeline combining vessel movement, port activity, and weather data to identify abnormal port behavior and disruption signals.
- Implemented graph-based risk propagation using NetworkX to model interconnected ports and estimate how disruptions can cascade across the maritime network.
- Built a streaming risk-monitoring dashboard with anomaly scoring, EWMA smoothing, and MTTD/Risk Delta metrics to evaluate early detection of maritime disruptions.

### Verification-Guided Retrieval-Augmented Generation for Semiconductor Device Physics

*Mar 2026 – Jul 2026*

- Designed a neuro-symbolic RAG pipeline pairing a fine-tuned 0.5B LLM (LoRA) with a 3-stage SymPy verification layer (symbolic parsing, dimensional analysis, numerical plausibility), boosting physics-correctness by 135% over a 70B baseline (p = 0.002).
- Built a hybrid retrieval subsystem (FAISS dense + BM25 sparse with custom physics tokenizer, fused via RRF and cross-encoder reranking) achieving Hit@3 = 0.940 on a 100-question semiconductor physics benchmark.
- Engineered a physics-score-driven Best-of-N candidate selection strategy, replacing LLM-as-a-judge evaluation with deterministic equation verification and validating via statistical tests and ablation studies.
- Optimized the pipeline for edge deployment, achieving 116× lower VRAM usage (1.2GB vs 140GB) and 7.1× lower latency compared to the baseline, running completely offline on an 8GB GPU.

### NeuroBank

*May 2026 – Jul 2026*

- Designed a multi-agent AI architecture with NLU, Planner, Reflection, and Execution agents for accurate intent recognition, reasoning, and secure task execution.
- Designed a normalized, indexed SQLite schema (accounts, transactions, audit_logs) and wrote transactional, multi-table JOIN queries to guarantee atomic fund transfers and power LLM-driven balance/history lookups, reducing query latency from 45ms to 5ms.
- Integrated LLM function calling with backend APIs to enable conversational workflows for balance inquiries, fund transfers, transaction history, and financial assistance.
- Built a secure, scalable backend with authentication, persistent data management, and modular microservices, enabling reliable and extensible AI-driven banking operations.

### ClarityStack

*Feb 2026 – May 2026*

- Designed and developed an end-to-end local-first knowledge management system that extracts long-form AI chat histories into structured, version-controlled knowledge bases while maintaining raw transcripts as immutable ground truth.
- Built a distributed microservices backend using FastAPI and SQLite, incorporating dedicated services for learning optimization (SRS), document editing, and specialized analytics (ThreatLens).
- Modeled relational schemas across 3 microservices (SRS, editor, ThreatLens) with cross-service foreign keys linking transcripts → notes → review cards, and optimized SRS scheduling queries with composite indexes on (user_id, next_review_date) to speed up daily review-card generation.
- Automated long-term knowledge retention pipelines by linking Markdown and rich-text editing workflows directly to Spaced Repetition Systems (SRS) and temporal tracking cards.

### Automated Diabetic Retinopathy Detection using Deep Learning

*Sep 2025 – Jan 2026*

- Engineered deep learning pipelines using EfficientNet, ConvNeXt, and SwinTiny for multi-class classification of Diabetic Retinopathy from retinal fundus images.
- Integrated Grad-CAM explainability visualizations to enhance model interpretability and highlight clinically relevant regions.
- Achieved 90.42% classification accuracy with 94.17% Quadratic Weighted Kappa (QWK) score, indicating high clinical agreement.

### DRISTI: Multi-Modal IoT Assistive System for the Visually Impaired

*Mar 2024 – Sep 2024*

- Architected a Raspberry Pi 5-based wearable platform integrating YOLOv8-nano, ultrasonic ranging, face recognition, and image captioning.
- Achieved 98.42% detection precision with 25 ms latency in real-time indoor navigation.
- Integrated multimodal voice and haptic feedback systems for enhanced situational awareness.
- Optimized KNN-based on-device face recognition with dynamic enrollment, eliminating cloud dependence.

## Patent Published

### Radiomics-Guided Cross-Attention Fusion for Severity Grading of Diabetic Retinopathy

*July 2026*

- *Field of Invention:* Bio Medical Engineering
- Indian Patent Application No. **202641091021**, Status: **Published and Awaiting Examination**

## Achievements & Publication

- **First Place Winner:** MCP Hackathon organized by NitroStack and WeKan
- **DRISHTI: An Edge-AI and IoT Multimodal Assistive Navigation System for the Visually Impaired:** Presented at ICTIS 2026 Conference, Bangkok, Thailand
- **Data Fellowship 2025:** Selected for data-driven research and civic tech innovation.
- **Chancellor’s Scholarship:** Amrita Vishwa Vidyapeetham, Amritapuri, Kerala

## Certifications

- **Associate Data Analyst:** Issued by DataCamp — Feb 2026
- **Exploring Artificial Intelligence: Use Cases and Applications:** Issued by AWS Academy — Sep 2025
- **AWS Academy Cloud Foundations:** Issued by Amazon Web Services — Aug 2025
- **Machine Learning A-Z: AI, Python & R:** Issued by Udemy — May 2025
- **AI/ML for Geodata Analysis:** Issued by Indian Institute of Remote Sensing (IIRS), ISRO — Sep 2024
