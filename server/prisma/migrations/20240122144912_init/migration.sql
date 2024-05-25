-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "parentsPhoneNumber" TEXT,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentInfo" (
    "id" TEXT NOT NULL,
    "request" TEXT NOT NULL,
    "availableTime" TEXT,
    "characterTraits" TEXT,
    "knowledgeLevel" TEXT NOT NULL,
    "notes" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "StudentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "slots" INTEGER NOT NULL DEFAULT 1,
    "url" TEXT NOT NULL,
    "topic" TEXT,
    "grade" TEXT,
    "homework" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "homeworkCheck" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bibliography" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "url" TEXT,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Bibliography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsBibliography" (
    "studentId" TEXT NOT NULL,
    "bibliographyId" TEXT NOT NULL,

    CONSTRAINT "StudentsBibliography_pkey" PRIMARY KEY ("studentId","bibliographyId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "time" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_phoneNumber_key" ON "Teacher"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNumber_key" ON "Student"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "StudentInfo_studentId_key" ON "StudentInfo"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_teacherId_date_key" ON "Lesson"("teacherId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_studentId_date_key" ON "Lesson"("studentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Bibliography_name_author_key" ON "Bibliography"("name", "author");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_lessonId_key" ON "Payment"("lessonId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bibliography" ADD CONSTRAINT "Bibliography_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsBibliography" ADD CONSTRAINT "StudentsBibliography_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsBibliography" ADD CONSTRAINT "StudentsBibliography_bibliographyId_fkey" FOREIGN KEY ("bibliographyId") REFERENCES "Bibliography"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
